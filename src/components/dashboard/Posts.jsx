import React,{useEffect} from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainAction } from 'redux/actions/index.actions'
import { Button } from "react-bootstrap"
import { ACTIONS } from "redux/actions/types"
import { Link } from "react-router-dom";
const Posts = (props) => {
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `JDM Dashboard | posts`;
        //if(props.categories.length === 0)
       props.actions.mainAction(ACTIONS.LOAD_POSTS)
    },[])
    console.log(props)
    const PostList = () => {
        return Object.values(props.posts).map(post =>{
            console.log(post)
          return ( <tr>
            <td className="post-title"><Link to="/dashboard/edit">{post.postTitle}</Link></td>
            <td className="post-date">{post.postDate}</td>
            <td className="post-actions"><button class="btn btn-datatable btn-icon btn-transparent-dark mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button> <button class="btn btn-datatable btn-icon btn-transparent-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button></td>
          </tr> )
        })
    }
    return (<>
    <table className="table table-hover">
  <thead >
    <tr>
      <th scope="col" style={{"text-align":"center"}}>Title</th>
      <th scope="col" style={{"text-align":"center"}}>Date</th>
      <th scope="col" style={{"text-align":"center"}}><Button>Add News</Button></th>
    </tr>
  </thead>
  <tbody>
   <PostList />
  </tbody>
</table>
    </>)
}

function mapStateToProps(state) {
    return {
      posts:state.postsReducer
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
  )(Posts);
