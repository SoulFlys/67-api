import axios from 'axios'
import async from 'async'

export const fetch = (model, query) => {
    return axios.get(model, {params:query}).then((response) => {
    	if(response.status === 200){
    		return response.data
    	}else{
    		return {thread:{comments:0}}
    	}
    })
}

export const getComment = async (articleList) => {
    return new Promise((resolve, reject)=> {
        async.map(articleList,(item,callback)=>{
            let params = { short_name: '67one',thread_key:String(item._id) }
            fetch('https://api.duoshuo.com/threads/listPosts.json',params).then((res)=>{
                item.comment = res.thread.comments;
                callback();
            })
        },(err)=>{
            if (err) console.error(err.message);
            resolve(articleList);
        }); 
    });
}