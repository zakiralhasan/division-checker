import React, { useState } from 'react';
import data1 from "../assets/divisions.json";
import data2 from "../assets/districts.json";
import data3 from "../assets/upazilas.json";
import data4 from "../assets/unions.json";
import { useForm } from 'react-hook-form';
const Home = () => {
    // const [loading, setLoading] = (true)
    const { register, handleSubmit, reset } = useForm();
    const [selecDivision, setSelectDivision] = useState()
    const [selecDistrict, setSelectDistrict] = useState()
    const [selecUpazila, setSelectUpazila] = useState()
    const [selecUnion, setSelectUnion] = useState()
    const [selecVillage, setSelectVillage] = useState()

    const handleForm = data => {
        const divisionName = data.division;
        const districtName = data.district;
        const upazilaName = data.upazila;
        const unionName = data.union;
        const villageName = data.village;
        // console.log(data.village)

        const totalInfo = {
            "Division": data.division,
            "District": data.district,
            "Upazila": data.upazila,
            "Union": data.union,
            "Village": data.village,
        }
        // console.log(totalInfo)
    }

    //Get division name and collect all data aginst that name.
    const filterdDivisionName = data1[0].data.filter(filtData => filtData.name === selecDivision);
    //Collect all district name regarding the above division.
    const filterdDistrictList = data2[0].data.filter(filtData => filtData?.division_id === filterdDivisionName[0]?.id);

    //Get district name and collect all data aginst that name.
    const filterdDistrictName = data2[0].data.filter(filtData => filtData.name === selecDistrict);
    //Collect all upazila name regarding the above district.
    const filterdUpazilaList = data3[0].data.filter(filtData => filtData?.district_id === filterdDistrictName[0]?.id);

    //Get upazila name and collect all data aginst that name.
    const filterdUpazilaName = data3[0].data.filter(filtData => filtData.name === selecUpazila);
    //Collect all union name regarding the above upazila.
    const filterdUnionList = data4[0].data.filter(filtData => filtData?.upazilla_id === filterdUpazilaName[0]?.id);

    return (
        <div className='home-page'>
            <h2>Home page</h2>

            <form onSubmit={handleSubmit(handleForm)}>
                {/* division selector */}
                <div>
                    <select {...register("division", { onChange: (e) => setSelectDivision(e.target.value) })}>
                        <option>Select Division</option>
                        {
                            data1[0].data.map(division => <option key={division.id} value={division.name}>{division.name}
                            </option>)
                        }
                    </select>
                </div>
                {/* district selector */}
                {selecDivision &&
                    <div>
                        <select {...register("district", { onChange: (e) => setSelectDistrict(e.target.value) })}>
                            <option>Select District</option>
                            {
                                filterdDistrictList?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>
                }

                {/* upazila selector */}
                {
                    selecDistrict &&
                    <div>
                        <select {...register("upazila", { onChange: (e) => setSelectUpazila(e.target.value) })}>
                            <option>Select Upazila</option>
                            {
                                filterdUpazilaList?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                            }
                        </select>
                    </div>
                }
                {/* unions selector */}
                {
                    selecUpazila &&
                    <div>
                        <select {...register("union", { onChange: (e) => setSelectUnion(e.target.value) })}>
                            <option>Select Union</option>
                            {
                                filterdUnionList.map(union => <option key={union.id} value={union.name}>{union.name}</option>)
                            }
                        </select>
                    </div>
                }
                {/* village name section*/}
                {
                    selecUnion &&
                    <div>
                        <input type="text"  {...register("village")} placeholder="Enter your village name" />
                        <button>submit</button>
                    </div>
                }

            </form>
        </div>
    );
};

export default Home;