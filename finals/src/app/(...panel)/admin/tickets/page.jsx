import React from "react";

const AllTickets = () => {
  // const [current, setCurrent] =  useState("allTickets")

  return <div>

    {/* Buttons  -> All Tickets, Resoled Tickets, Open Tickets, InProgress Tickets, most reopen tickets */}
    {/* onClick={()=>setCurrent('resolvedTicets')} */}

    {/* conditional Rendering
    
      {
        current === 'allTickets' && <AllTicket  /> 
      }


       {
        current === 'resolvedTickets' && <ResolvedTicket  /> 
      }
    
    
    */}


    API
    <br />
    All Tickets - API - /tickets/all-tickets {/* (defualt) -> Table */}

    Resolved Tickets API - /tickets/resolved-tickets
    most-reopen Tickets API - /tickets/most-reopen
    open-tickets Tickets API - /tickets/open-tickets
    inprogress-tickets Tickets API - /tickets/inprogress-tickets



  </div>;
};

export default AllTickets;
