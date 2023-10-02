// Import necessary dependencies
import React from 'react';
import { Grid, Button, Box } from '@mui/material';


// Define the AdminDashboard component
const AdminDashboard = () => {
//   const history = useHistory();

  // Function to handle navigation to complaint pages
  

  // Function to handle navigation to complaint details page
  const navigateToComplaintDetails = (complaintId:any) => {
    // You may replace this URL with the actual route of your application
    const route = `/post/${complaintId}`;
    // history.push(route);
  };

  // Function to handle resolving a complaint
  const handleResolve = (complaintId:any) => {
    // Implement your logic for resolving a complaint
    console.log(`Resolve complaint with ID: ${complaintId}`);
  };

  return (
    <div>
        Hello 
    </div>
    // <div>
    //   {/* Top Half: Pending, Ongoing, Finished Boxes */}
    //   <Grid container spacing={2}>
    //     <Grid item xs={4}>
    //       <Box
    //         sx={{
    //           backgroundColor: '#e74c3c',
    //           padding: 2,
    //           textAlign: 'center',
    //           cursor: 'pointer',
    //           color: 'white',
    //         }}
    //         onClick={() => console.log('Pending')}
    //       >
    //         <h2>Pending</h2>
    //         {/* You can display additional information or stats here */}
    //       </Box>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Box
    //         sx={{
    //           backgroundColor: '#3498db',
    //           padding: 2,
    //           textAlign: 'center',
    //           cursor: 'pointer',
    //           color: 'white',
    //         }}
    //         onClick={() => console.log('Ongoing')}
    //       >
    //         <h2>Ongoing</h2>
    //         {/* You can display additional information or stats here */}
    //       </Box>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Box
    //         sx={{
    //           backgroundColor: '#2ecc71',
    //           padding: 2,
    //           textAlign: 'center',
    //           cursor: 'pointer',
    //           color: 'white',
    //         }}
    //         onClick={() => console.log('Finished')}
    //       >
    //         <h2>Finished</h2>
    //         {/* You can display additional information or stats here */}
    //       </Box>
    //     </Grid>
    //   </Grid>

    //   {/* Bottom Half: List of Complaints */}
    //   <Grid container spacing={2} sx={{ marginTop: 4 }}>
    //     {/* Left Side: Complaint Summaries */}
    //     <Grid item xs={6}>
    //       <div style={{ overflowY: 'scroll', height: 'calc(100vh - 200px)' }}>
    //         {/* Replace this with your actual list of complaint summaries */}
    //         <ul>
    //           <li onClick={() => navigateToComplaintDetails(1)}>
    //             Complaint 1 - Location 1
    //           </li>
    //           <li onClick={() => navigateToComplaintDetails(2)}>
    //             Complaint 2 - Location 2
    //           </li>
    //           <li onClick={() => navigateToComplaintDetails(3)}>
    //             Complaint 3 - Location 3
    //           </li>
    //           {/* ... */}
    //         </ul>
    //       </div>
    //     </Grid>

    //     {/* Right Side: Complaint Details */}
    //     <Grid item xs={6}>
    //       {/* This section will show detailed information of the selected complaint */}
    //       {/* You can implement this part based on your requirements */}
    //     </Grid>
    //   </Grid>

    //   {/* Resolve Button (Top Right Corner) */}
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={() => console.log('selectedComplaintId')}
    //     sx={{
    //       position: 'fixed',
    //       top: 16,
    //       right: 16,
    //     }}
    //   >
    //     Resolve
    //   </Button>
    // </div>
  );
};

export default AdminDashboard;
