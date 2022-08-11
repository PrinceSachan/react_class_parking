import { useNavigate } from "react-router-dom";

//HOC
export function withRouter(Component) {
  function ComponentWithRouterProps(props) {
    let navigate = useNavigate();

    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithRouterProps;
}
