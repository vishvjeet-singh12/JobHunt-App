import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { setSearchQuery } from "@/Store/Redux/SliceStore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"


const filterData=[
  {
    filterType:"Location",
    array:["Delhi","Banglore","Hydrabad","Pune","Mumbai","Indore"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","FullStack Developer","Mern Stack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-1Lakh","1Lakh to 5Lakh"]
  }
]
const FilterJobCard = () => {
  const [selectedValue,setSelectedValue]=useState("");
  const dispatch=useDispatch();

  const changeHandler=(value)=>{
     setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue));
  },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
       <h1 className="font-bold text-lg">Filter Jobs</h1>
       <hr className="mt-3"/>
       <RadioGroup value={selectedValue} onValueChange={changeHandler}>
       {filterData.map((data,index)=>{
        return(
          <div key={""}>
          <h1 className="font-bold text-lg">{data.filterType}</h1>
          {
            data.array.map((item,idx)=>{
              const itemId=`id${index}-${idx}`
            return(
              <div key={""} className="flex items-center space-x-2 my-2">
              <RadioGroupItem value={item} id={itemId} style={{color:"Black   "}}/>
              <Label htmlFor={itemId}>{item}</Label>
              </div>
            )
          })}
          </div>
        )
       })}
       </RadioGroup>
    </div>
  )
}

export default FilterJobCard
