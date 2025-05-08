import { ElMessage } from 'element-plus'

export default function Message(type,msg){
    if(type==="success"){
        ElMessage({
            showClose : true,
            message : msg,
            type : "success"
        })
    }else if(type==="error"){
        ElMessage({
            showClose : true,
            message : msg,
            type : "error"
        })
    }else if(type==="warn"){
        ElMessage({
            showClose : true,
            message : msg,
            type : "warning"
        })
    }
}