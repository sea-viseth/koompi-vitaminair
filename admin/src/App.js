import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Layouts/login";
import AddAbout from "./components/Pages/about/addAbout";
import AllAbout from "./components/Pages/about/allabouts";
import EditAbout from "./components/Pages/about/editAbout";
import Dashboard from "./components/Pages/dashboard";
import Donationers from "./components/Pages/donationers";
import AddInitation from "./components/Pages/Initation/addInitation";
import AllInitation from "./components/Pages/Initation/allInitation";
import EditInitation from "./components/Pages/Initation/editInitation";
import AddMember from "./components/Pages/member/addMember";
import AllMembers from "./components/Pages/member/allMember";
import EditMember from "./components/Pages/member/editMember";
import AddProject from "./components/Pages/project/addProject";
import AllProject from "./components/Pages/project/allProjects";
import EditProject from "./components/Pages/project/editProject";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/admin/donationers"
            component={Donationers}
          />
          <PrivateRoute
            exact
            path="/admin/addinitation"
            component={AddInitation}
          />
          <PrivateRoute
            exact
            path="/admin/initations"
            component={AllInitation}
          />
          <PrivateRoute
            exact
            path="/admin/edit-initation/:id"
            component={EditInitation}
          />
          <PrivateRoute exact path="/admin/addmember" component={AddMember} />
          <PrivateRoute exact path="/admin/members" component={AllMembers} />
          <PrivateRoute
            exact
            path="/admin/edit-member/:id"
            component={EditMember}
          />
          <PrivateRoute exact path="/admin/addabout" component={AddAbout} />
          <PrivateRoute exact path="/admin/abouts" component={AllAbout} />
          <PrivateRoute
            exact
            path="/admin/edit-about/:id"
            component={EditAbout}
          />
          <PrivateRoute exact path="/admin/addproject" component={AddProject} />
          <PrivateRoute exact path="/admin/projects" component={AllProject} />
          <PrivateRoute
            exact
            path="/admin/edit-project/:id"
            component={EditProject}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
