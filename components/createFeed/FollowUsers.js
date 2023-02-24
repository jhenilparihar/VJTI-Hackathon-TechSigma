import User from "./User"
const FollowPeople=()=>{
    const users=[
        {
         name:"@par222",
         img:"https://i.pinimg.com/736x/be/a3/80/bea380586967bf4de5fd1639a257354a.jpg",
         ownerCount:5

        },
        {
            name:"@parth222",
            img:"https://i.pinimg.com/736x/be/a3/80/bea380586967bf4de5fd1639a257354a.jpg",
            ownerCount:10

        },
        {
            name:"@param222",
            img:"https://i.pinimg.com/736x/be/a3/80/bea380586967bf4de5fd1639a257354a.jpg",
            ownerCount:21

        },
        {
            name:"@jyash222",
            img:"https://i.pinimg.com/736x/be/a3/80/bea380586967bf4de5fd1639a257354a.jpg",
            ownerCount:32

        }

    ]
    return(
        <>
        <div className="bg-[#232323] rounded-sm w-[300px] h-[360px] my-[5%] mx-[5%] px-3 ">
            <h1 className="py-3 text-center text-lg">People You May Know</h1>
            {users.map((u)=><User {...u}></User>)}

        </div>
        </>

    )
}
export default FollowPeople