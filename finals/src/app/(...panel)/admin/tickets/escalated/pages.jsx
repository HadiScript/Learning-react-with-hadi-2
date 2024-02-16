import { getAllEscTickets } from "@/actions/admin"
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";



const AssignModel = ({ open, setOpen, currentId, getAllAvailableAgents, agents }) => {

  useEffect(() => {
    if (open && currentId !== '') {
      getAllAvailableAgents(currentId);
    }


  }, [])


  // show all agents
  // reason
  return <Modal />
}











const AllEsc = () => {
  const { loading, list, getAllAvailableAgents, agent } = getAllEscTickets();
  // display from list
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState('')

  return (
    <div>AllEsc

      {/* 
      
        1 create function to fetch all escalated tickets ${API}/tickets/all-escalated-tickets
          update the state

        2 display in a table, in each row create an button to assgin ticket to another agent
        3 whenenver user clicks on assign button,(onclick => {setOpen(true); setCurrentId(x._id)} ) model should be open,  
        4 just the below the input you will have the list of available users 
      
      
      
      
      
      */}




      <AssignModel open={open} setOpen={setOpen} currentId={currentId} getAllAvailableAgents={getAllAvailableAgents} agents={agent} />
    </div>
  )
}

export default AllEsc