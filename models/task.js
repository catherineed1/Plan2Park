const mongoose = require('mongoose');  
  
const taskSchema = new mongoose.Schema({  
    task:{  
        type:String  
    }  
});  
  
const taskModel =  module.exports = mongoose.model('task',taskSchema);  
  
module.exports.addTask = (task,cb)=>{  
    task.save((err,taskData)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,taskData);  
            }  
    });  
}  
  
module.exports.getTask = (cb)=>{  
    taskModel.find((err,taskData)=>{  
          if(err){  
              cb(err,null);  
          }else{  
              cb(null,taskData);  
          }  
    });  
}  
  
module.exports.removeTask = (id,cb)=>{  
    taskModel.deleteOne({'_id':id},(err,taskData)=>{  
            if(err){  
                cb(err,null);  
            }else{  
                cb(null,taskData);  
            }  
    });  
}  