
import {Drawer,Box,styled,Button} from "@mui/material"
import { DashboardOutlined, ContactsOutlined,LogoutOutlined} from "@mui/icons-material"

 const StyleBox = styled(Box)({
    marginLeft:'40px',
    marginTop:'30px',
    display:'flex',
    textAlign:"center"
 })
 const ComposeButton =styled(Button)({
    backgroundColor:'#c2e7ff',
    color:"#001d35",
    padding:15,
    borderRadius:"4px",
    minwidth:140,
    textTransform:'none'


 })
 const StyledBox = styled(Box)({
    marginLeft:'40px',
    marginTop:'160%',
    display:'flex',
    textAlign:"center"})
const SideBar =() =>{

    return(
       <Drawer
         anchor='left'
         open={true}
         hideBackdrop={true}
         ModelProps={{
          keepMounted:true
       }}
       variant="persistent"
       sx={{
        '& .MuiDrawer-paper':{
            marginTop:'0px',
            width:250,
            background:'#CEF3FF',
            borderRight:'none',
            height:"100%"}
       }}

       >
      <h3 style={{color:' #0884FF',fontFamily:'Titillium Web',wordWrap:'break-word',fontSize:'25px',fontWeight:600 ,marginTop:'30px',marginLeft:"50px"}}>Logo</h3>
       <StyleBox>  <DashboardOutlined/>  Dashboard</StyleBox>
       <StyleBox> <ComposeButton>< ContactsOutlined/> Total contacts </ComposeButton>   </StyleBox>
       <StyledBox >  <LogoutOutlined />Logout</StyledBox>
       </Drawer>
    )
}
export default SideBar