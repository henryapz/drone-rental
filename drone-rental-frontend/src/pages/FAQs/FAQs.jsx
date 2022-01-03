import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

function FAQs() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const data = [
    {
      id: 'panel1',
      title: 'General settings',
      description:
        'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.',
    },
    {
      id: 'panel2',
      title: 'Users',
      description:
        'Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet.',
    },
    {
      id: 'panel3',
      title: 'Personal data',
      description:
        'Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.',
    },
  ];

  const styles = {
    container: {
      margin: '4rem 0',
    },
  };
  return (
    <div style={styles.container}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          {data.map(elem => (
            <Accordion
              expanded={expanded === elem.id}
              onChange={handleChange(elem.id)}
              key={elem.id}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{elem.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{elem.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default FAQs;
