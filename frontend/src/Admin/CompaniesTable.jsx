import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setCompanies } from "@/Store/Redux/SliceStore";
import { UserContext } from "@/Store/Usecontext";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const [allCompany, setAllCompnies] = useState([]);
  const { Authorization } = useContext(UserContext);
  const dispatch=useDispatch();
  
     //ye humne filter krne ke liye dispatch bina dispatch ke bhi data ajyega but company ko filter krne ke liye
       //direct allCompany se bhi print hojayega 
  const {companies,searchCompanyByText}=useSelector(store=>store.company)
  const [filterCompany,setFilterCompany]=useState(companies);
  useEffect(()=>{
      const filteredCompany=companies.length >=0 && companies.filter((company)=>{
        if(!searchCompanyByText){
          return true
        };
        return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
      setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])
  /////////

  const navigate=useNavigate();
  const getAllCompany = async () => {
    try {
      const response = await fetch(`https://jobhunt-app-1-tjyg.onrender.com/company/getCompany`, {
        method: "GET",
        headers: {
          Authorization: Authorization,
        },
      });
      const responseData = await response.json().then((result) => {
       
        if (response.status === 200) {
      
          setAllCompnies(result.data);
           dispatch(setCompanies(result.data));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCompany();
  }, []);
  return (
    <div>
      <Table className="font-semibold">
        <TableCaption>A List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Logo</TableHead>
            <TableHead className="text-center font-bold">Name</TableHead>
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className=" font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompany.length <= 0 ? (
            <span>You have not registered any company yet.</span>
          ) : (
            <>
              {filterCompany.map((company) => {
                return (
                  <TableRow key={company._id}>
                    <TableCell className="flex justify-center items-center">
                      <Avatar>
                        <AvatarImage src={company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-center">
                      {company.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {company.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={()=>{navigate(`/admin/companies/${company._id}`)}}>
                            <Edit2 className="w-5"/>
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
