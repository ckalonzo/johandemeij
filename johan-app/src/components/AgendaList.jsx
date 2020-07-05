import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { ACTIONS } from "redux/actions/types"
import Paginate from "components/shared/Paginate"
import List from "components/shared/List"
import Loading from "components/shared/Loading"
import {Dropdown,DropdownButton} from "react-bootstrap"
const AgendaList  = (props) => {
      let d = new Date();
      let day = d.getDate();
      let month = (d.getMonth() + 1).toString()
      let year = d.getFullYear().toString();
      const [listYear,setListYear] = useState(year)
      const [activeLink,setActiveLink]=useState("")
      useEffect(() => {
        window.scrollTo(0,0)
        document.title = "JohanDeMeij.com | Agenda"
        props.actions.mainAction(ACTIONS.LOAD_MUSIC,{})
        props.actions.mainAction(ACTIONS.LOAD_AGENDAS,{limit:100,skip:0,year:listYear})
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
     const loadYear = (selectedYear) =>{
        props.actions.mainAction(ACTIONS.LOAD_AGENDAS_FILTERED,{limit:100,skip:0,year:selectedYear})
      }
  
   const list = () =>{
     return Object.values(props.agendas).map(agenda => {
      let title = props.CDS.filter(CD=>CD.id===agenda.cd).map(CD=>CD.cdName),
          title1 = props.CDS.filter(CD=>CD.id===agenda.cd1).map(CD=>CD.cdName),
          title2 = props.CDS.filter(CD=>CD.id===agenda.cd2).map(CD=>CD.cdName),
          title3 = props.CDS.filter(CD=>CD.id===agenda.cd3).map(CD=>CD.cdName)

      agenda.title = title[0]
      agenda.title1 = title1[0]
      agenda.title2 = title2[0]
      agenda.title3 = title3[0]
     // console.log(listYear ,"===", year ,"&&",+agenda.month ,">=", month ,"&&", agenda.day.replace(/^0+/, '') ,">=", day)
      return +agenda.ON_OFF  === 1 ? <List key={agenda.id} {...agenda}/>:""
  })
   }
   const RenderDropdown = () => {
     const years = []
     const DropDownList = () => {
       let beginYear = 2011
       for (let i = beginYear; i <= +year; i++) {
          years.push(i)
        }
        return years.map(archiveYear => {
          return <Dropdown.Item as="button" onClick={()=>{loadYear(archiveYear)}}>{archiveYear}</Dropdown.Item>
        })
     }
     return (<>
     <DropdownButton id="dropdown-item-button" title="Archive" variant="outline-secondary">
     <DropDownList />
</DropdownButton>
     </>)
   }
    
    return (<>
    <section className="agenda-full">
    <h3 style={{textAlign:'center',fontSize:"2rem",textTransform: "uppercase",color:"#FFF"}}>Agenda</h3>
    <div className="container">
       <div className="archive">
          <ul>
          <li className={"archive-link "+activeLink} onClick={()=>{window.location.reload()}}>Current</li>
           <RenderDropdown />
          </ul>
         </div> 
    {list()}
      
    </div>
    </section>
    </>)
}
function mapStateToProps(state) {
    return {
        agendas:state.agendaReducer,
        CDS:state.musicReducer.allPresentations
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(
        {
            mainAction
        },
        dispatch
      )
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgendaList);
