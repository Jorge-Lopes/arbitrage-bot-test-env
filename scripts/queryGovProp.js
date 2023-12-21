import { queryProposals} from "./commands.js";

const main = () => {

  const proposal = queryProposals("http://0.0.0.0:26657");
  console.log(proposal);

};

main();
