import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { setSearchQuery } from "@/Store/Redux/SliceStore"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const category=[
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Developer",
    "FullStack Developer"
]
const CategoryCrousel = () => {

   const navigate=useNavigate();
   const dispatch=useDispatch();
  const searchHandler=(query)=>{
    dispatch(setSearchQuery(query));
    navigate("/browse")
}

  return (
    <div style={{marginTop:"-40px"}}>
       <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
         {category.map((cat,index)=>{
            return(
           <CarouselItem className="md:basis-1/2 lg:basis-1/3" style={{border:"2px solid gray",marginLeft:"2px"}} key={""}>
           <Button onClick={()=>searchHandler(cat)} variant="outline" className="rounded-full border-gray-400">{cat}</Button>
           </CarouselItem>
            )
         })}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
       </Carousel>
    </div>
  )
}

export default CategoryCrousel
