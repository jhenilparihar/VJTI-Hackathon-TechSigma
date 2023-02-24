import Owner from "./Owner";
const OwnerList = (props) => {
  return (
    <div className="flex flex-wrap   items-center [120px] overflow-y-auto  ">
      {props.owners.map((owner) => (
      
          <Owner {...owner} deg="Owner"></Owner>
        
      ))}
    </div>
  );
};
export default OwnerList;
