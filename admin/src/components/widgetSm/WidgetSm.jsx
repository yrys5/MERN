import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users,setUsers] = useState([])

  useEffect(()=>{
    const getUsers = async ()=>{
      try{
      const res = await userRequest.get("users/?new=true")
      setUsers(res.data)
    }catch{}
    }
    getUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=>(

          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://media.istockphoto.com/vectors/user-sign-icon-person-symbol-human-avatar-vector-id639085642?k=6&m=639085642&s=170667a&w=0&h=Xq5G_D9UILnAc9u7Ha1NoeQpNPkW3SIk0st25O_KUnU="}
            alt=""
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.email}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
