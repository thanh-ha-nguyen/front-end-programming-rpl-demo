import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function HomePage() {
  return (
    <Box>
      <Typography component="p" mt={2}>
        This is a recognition of prior learning (RPL) demonstration of 
        the Front End Programming course in Haaga-Helia University of 
        Applied Science (UAS). This project is done by Thanh Ha Nguyen, 
        student code 2505863, <a href="mailto:thanh-ha.nguyen@myy.haaga-helia.fi">
        thanh-ha.nguyen@myy.haaga-helia.fi</a>
      </Typography>
      <Typography component="p" mt={2}>
        GitHub repo: <a href="https://github.com/thanh-ha-nguyen/front-end-programming-rpl-demo" target="_blank">
        https://github.com/thanh-ha-nguyen/front-end-programming-rpl-demo</a>
      </Typography>
      <Typography component="p" mt={2}>
        Live demo: <a href="https://thanh-ha-nguyen.github.io/front-end-programming-rpl-demo/" target="_blank">
        https://thanh-ha-nguyen.github.io/front-end-programming-rpl-demo/</a>
      </Typography>
    </Box>
  );
}

export default HomePage;
