import axios from 'axios'


export const fetch = (model, query) => {
    return axios.get(model, {params:query}).then((response) => {
    	// console.log('response',response)
    	if(response.status === 200){
    		return response.data
    	}else{
    		return {thread:{comments:0}}
    	}
    })
    // return axios({
    //     method: 'get',
    //     url: model,
    //     params:query,
    //     headers: {
    //         'X-Requested-With': 'XMLHttpRequest'
    //     }
    // }).then(response => {
    //     console.log('response',response)
    // 	if(response.status === 200){
    // 		return response.data
    // 	}else{
    // 		return {thread:{comments:0}}
    // 	}
    // })
}
