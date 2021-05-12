import { makeStyles } from "@material-ui/core/styles"; 
export const useUpsertUserStyles = makeStyles((theme) => ({
  root: {
    minHeight: 1000,
    height: "100vh",
    maxHeight: "auto",
    padding: "100px 50px 100px 50px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  rootSm: {
    minHeight: 530,
    height: "100vh",
    maxHeight: "auto",
    padding: "15px 15px 15px 15px",
    backgroundColor: "#393e46",
    zIndex: "-1",
  },
  addButton: {
    paddingRight: 10,
  },
  sonContainer: {
    padding: "0px 0px 0px 0px",
    backgroundColor: "#222831",
    height: "100%",
    minHeight: 800,
  },
  field: {
    margin: "0px 24px 24px 24px",
  },
  title: {
    margin: "24px 24px 24px 24px",
  },
}));