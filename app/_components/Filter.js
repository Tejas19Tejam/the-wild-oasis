"use client";

import { useSearchParams,useRouter, usePathname } from "next/navigation";

function Filter() {

    const paramsString =useSearchParams();
    // Allow to programmatically change route inside client components.
    const router = useRouter();

    const pathname=usePathname();
    const activeFilter= paramsString.get("capacity") ?? 'all';



    function handleFilter(filter){

    //    const params = new URLSearchParams({capacity:"all"});
    //    const searchParams = new URLSearchParams(paramsString);
    //    searchParams.set("capacity", filter);
        router.push(`${pathname}?capacity=${filter}`);
       
    }

    return (
        <div className="border border-primary-800 flex">
                <Button filter="all" activeFilter={activeFilter} handleFilter={handleFilter}>All Cabins</Button>
            <Button filter="small" activeFilter={activeFilter} handleFilter={handleFilter}>1&mdash;3 guests</Button>
            <Button filter="medium" activeFilter={activeFilter} handleFilter={handleFilter}>4&mdash;7 guests</Button>
            <Button filter="large" activeFilter={activeFilter} handleFilter={handleFilter}>8&mdash;12 guests</Button>
        </div>
    ) 
}



function Button({filter , handleFilter ,activeFilter , children }){
    return <button className={`border-none py-2 px-5 hover:bg-primary-700 ${activeFilter === filter && 'bg-primary-700 text-primary-50' }`} onClick={()=>handleFilter(filter)}>{children}</button>

}

export default Filter;
