import React,{useState} from 'react';
import './App.css';

function App() {

const [toDos, setToDos] = useState([])
const [toDo, setToDo] = useState({
  id:'',
  action:'',
  status:false,
  completedDate:''
})

function handleChange(e) {
  setToDo({
    ...toDo,
    id:Date.now(),
    action:e.target.value
  })
}


function clickHandler(e) {
  setToDos([...toDos,toDo])
  setToDo({
    ...toDo,
    action:''
  })
}
function deleteHandler(id) {
  let filteredList=toDos.filter(itm=>itm.id!==id)
  setToDos(filteredList)
}

function checkHandler(e,args) {
  if(e.target.checked){
    setToDos(toDos.filter(todo=>{
      if(todo.id===args.id){
        todo.status=true
        todo.completedDate=new Date(Date.now()).toLocaleDateString()
      }
      return todo
    }))
  }else{
    setToDos(toDos.filter(todo=>{
      if(todo.id===args.id){
        todo.status=false
        todo.completedDate=''
      }
      return todo
    }))
  }
}

const completedTasks=toDos.filter(todo=>todo.status===true)
console.log(toDos);
  return (
    <>
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" value={toDo.action} onChange={handleChange} placeholder="🖊️ Add item..." />
        <i className="fas fa-plus" onClick={clickHandler}></i>
      </div>
      <div className="todos">
      {
        toDos.map((todo,ind)=>{
          return <div key={ind} className="todo">
          <div className="left">
            <input type="checkbox" onChange={(e)=>checkHandler(e,todo)} name="" id="" />
            <p>{todo.action}</p>
          </div>
          <div className="right">
            <i className="fas fa-times" onClick={()=>deleteHandler(todo.id)}></i>
          </div>
        </div>
        })
      }
      </div>
    </div>
    <div className="child1">
      <h2>Completed TODOS</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Completed Date</th>
          </tr>
        </thead>
        <tbody>
          {
            completedTasks.map((itm,key)=>{
              return <tr key={key}>
              <td>{itm.action}</td>
              <td>{itm.completedDate}</td>
            </tr>
            })
          }
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;