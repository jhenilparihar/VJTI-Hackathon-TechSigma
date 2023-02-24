import Header from "@/components/profileHeader/Header"
import Details from "@/components/profileHeader/UserDetails"
import Filter from "@/components/profileHeader/FilterHeader"
import Allmynft from "@/components/profileHeader/Allmynft"
import { useRouter } from "next/router"
const Index=()=>{

    const router=useRouter()
    const accountAddress=router.query.slug
    
    return(
        <>
        <Header accountAddress={accountAddress}></Header>
        <Details accountAddress={accountAddress}></Details>
        <Filter accountAddress={accountAddress}></Filter>
        <Allmynft accountAddress={accountAddress}></Allmynft>

        </>

    )
}
export default Index