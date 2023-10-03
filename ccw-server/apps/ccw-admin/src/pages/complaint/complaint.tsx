import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const Complaint = () => {
  const { id } = useParams();
  const [complaintDetails, setComplaintDetails] = useState(null);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const response = await fetch(`http://192.168.0.112:3000/api/post/${id}`);
        const data = await response.json();
        setComplaintDetails(data);
      } catch (error) {
        console.error('Error fetching complaint details:', error);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {complaintDetails ? (
        <Card>
          <CardMedia
            component="img"
            alt="Complaint Image"
            height="140"
            image={complaintDetails.imageUrl}
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {complaintDetails.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {complaintDetails.city}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {complaintDetails.content}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Status: {complaintDetails.status?.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Upvotes: {complaintDetails._count.upvotes}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Comments: {complaintDetails._count.comments}
            </Typography>
            <Button variant="contained" color="primary">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </div>
  );
};

export default Complaint;
