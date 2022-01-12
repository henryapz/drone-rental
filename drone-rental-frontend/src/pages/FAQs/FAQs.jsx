import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
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
      title: '¿Cómo pago el alquiler de un dron?',
      description:
        'Complete el proceso de pedido como se describe arriba. Al finalizar la compra, ' +
        'después de ingresar su información, se lo dirigirá al sitio web seguro de Paypal.',
    },
    {
      id: 'panel2',
      title: '¿Cómo reservo un dron para fechas específicas?',
      description:
        'Complete el proceso de pedido como se describe arriba y seleccione la fecha' +
        ' de inicio y finalización de su alquiler. Su alquiler comienza cuando llega' +
        ' a su ubicación (para envío) o cuando lo recoge (para recogida local). Su ' +
        'alquiler finaliza cuando lo devuelve o lo deja. Nos pondremos en contacto' +
        ' contigo si surge algún problema. El dron llegará al final del día que ' +
        'especifique como fecha de inicio. El dron debe enviarse de regreso en o ' +
        'antes de la fecha de finalización que especifique.',
    },
    {
      id: 'panel3',
      title: '¿El período de alquiler incluye el tiempo de tránsito del envío?',
      description:
        'No. El período de alquiler comienza el día en que recibe el dron y finaliza' +
        ' el día en que lo devuelve. Por ejemplo, un alquiler de 3 días podría ' +
        ' comenzar el viernes y terminar el lunes. El alquiler de un dron no puede' +
        ' comenzar ni finalizar un domingo ni un feriado en Perú',
    },
    {
      id: 'panel4',
      title: '¿A dónde envían?',
      description:
        'Le enviaremos un dron de alquiler a cualquier lugar de los Perú y el envío rápido está disponible.',
    },
    {
      id: 'panel5',
      title: '¿Qué pasa si he realizado el pago y necesito cancelar?',
      description:
        'Intente notificarnos tan pronto como sepa que debe cancelar. Si el dron' +
        ' se ha enviado, el alquiler no se puede cancelar. Si el dron aún no se ' +
        'ha enviado, puede reprogramarlo para otro momento o puede cancelarlo. ' +
        'Es posible que se aplique una tarifa de cancelación según la cantidad ' +
        'de aviso que haya dado antes de la fecha de inicio.',
    },
    {
      id: 'panel6',
      title: '¿Puedo viajar con el dron alquilado?',
      description:
        'Intente notificarnos tan pronto como sepa que debe cancelar. Si el dron' +
        ' se ha enviado, el alquiler no se puede cancelar. Si el dron aún no se ' +
        'ha enviado, puede reprogramarlo para otro momento o puede cancelarlo. ' +
        'Es posible que se aplique una tarifa de cancelación según la cantidad ' +
        'de aviso que haya dado antes de la fecha de inicio.',
    },
    {
      id: 'panel7',
      title: '¿Por qué se requiere un depósito?',
      description:
        'Intente notificarnos tan pronto como sepa que debe cancelar. Si el dron' +
        ' se ha enviado, el alquiler no se puede cancelar. Si el dron aún no se ' +
        'ha enviado, puede reprogramarlo para otro momento o puede cancelarlo. ' +
        'Es posible que se aplique una tarifa de cancelación según la cantidad ' +
        'de aviso que haya dado antes de la fecha de inicio.',
    },
    {
      id: 'panel8',
      title: '¿Cuándo tengo que Pagar el Depósito?',
      description:
        'Intente notificarnos tan pronto como sepa que debe cancelar. Si el dron' +
        ' se ha enviado, el alquiler no se puede cancelar. Si el dron aún no se ' +
        'ha enviado, puede reprogramarlo para otro momento o puede cancelarlo. ' +
        'Es posible que se aplique una tarifa de cancelación según la cantidad ' +
        'de aviso que haya dado antes de la fecha de inicio.',
    },
  ];

  return (
    <Box sx={{ pt: '50px', pb: '50px' }}>
      <Container>
        <Typography gutterBottom variant="h3" component="div" textAlign="center">
          Preguntas Frecuentes (FAQs)
        </Typography>
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
      </Container>
    </Box>
  );
}

export default FAQs;
