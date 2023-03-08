import React, { useState } from 'react';
import data1 from "../assets/divisions.json";
import data2 from "../assets/districts.json";
import data3 from "../assets/upazilas.json";
import data4 from "../assets/unions.json";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
const Home = () => {
    const { register, handleSubmit } = useForm();
    const [selectDivision, setSelectDivision] = useState()
    const [selectDistrict, setSelectDistrict] = useState()
    const [selectUpazila, setSelectUpazila] = useState()
    const [selectUnion, setSelectUnion] = useState()

    const handleForm = data => {
        const totalInfo = {
            "Division": data.division,
            "District": data.district,
            "Upazila": data.upazila,
            "Union": data.union,
            "Village": data.village,
        }
        console.log(totalInfo)
        swal({
            title: "Your Select Data",
            text: `
            Division Name: ${totalInfo.Division}
            District Name: ${totalInfo.District}
            Upazila Name : ${totalInfo.Upazila}
            Union Name   : ${totalInfo.Union}  
            Village Name : ${totalInfo.Village}  
            `,
            icon: "success",
            button: "Okay",
        });
    }

    //Get division name and collect all data against that name.
    const filterdDivisionName = data1[0].data.filter(filtData => filtData.name === selectDivision);
    //Collect all district names regarding the above division.
    const filterdDistrictList = data2[0].data.filter(filtData => filtData?.division_id === filterdDivisionName[0]?.id);

    //Get district name and collect all data against that name.
    const filterdDistrictName = data2[0].data.filter(filtData => filtData.name === selectDistrict);
    //Collect all upazila names regarding the above district.
    const filterdUpazilaList = data3[0].data.filter(filtData => filtData?.district_id === filterdDistrictName[0]?.id);

    //Get upazila name and collect all data against that name.
    const filterdUpazilaName = data3[0].data.filter(filtData => filtData.name === selectUpazila);
    //Collect all union names regarding the above upazila.
    const filterdUnionList = data4[0].data.filter(filtData => filtData?.upazilla_id === filterdUpazilaName[0]?.id);

    //Get union name and collect all data against that name.
    const filterdUnionName = data4[0].data.filter(filtData => filtData.name === selectUnion);

    //set conditions for visibility of the input or select field
    let conditionOne = filterdDivisionName[0]?.id === filterdDistrictName[0]?.division_id;
    let conditionTwo = filterdDistrictName[0]?.id === filterdUpazilaName[0]?.district_id;
    let conditionThree = filterdUpazilaName[0]?.id === filterdUnionName[0]?.upazilla_id;

    return (
        <div className='home-page'>
            <div className='home-page__container'>
                <h2>Please enter your village name <br />by selecting options.</h2>

                <form onSubmit={handleSubmit(handleForm)}>
                    {/* division selector */}
                    <div className='home-page__container__division-section '>
                        <select {...register("division", { onChange: (e) => setSelectDivision(e.target.value) })} className='input-field'>
                            <option>Select Division</option>
                            {
                                data1[0].data.map(division => <option key={division.id} value={division.name}>{division.name}
                                </option>)
                            }
                        </select>
                    </div>
                    {/* district selector */}
                    {(selectDivision && selectDivision !== 'Select Division') &&
                        <div className='home-page__container__district-section'>
                            <select {...register("district", { onChange: (e) => setSelectDistrict(e.target.value) })} className='input-field'>
                                <option>Select District</option>
                                {
                                    filterdDistrictList?.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>

                    }

                    {/* upazila selector */}
                    {
                        (selectDistrict && conditionOne && selectDistrict !== 'Select District') &&
                        <div className='home-page__container__upazilla-section'>
                            <select {...register("upazila", { onChange: (e) => setSelectUpazila(e.target.value) })} className='input-field'>
                                <option>Select Upazila</option>
                                {
                                    filterdUpazilaList?.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                }
                            </select>
                        </div>
                    }
                    {/* unions selector */}
                    {
                        (selectUpazila && conditionTwo && conditionOne && selectUpazila !== 'Select Upazila') &&
                        <div className='home-page__container__union-section'>
                            <select {...register("union", { onChange: (e) => setSelectUnion(e.target.value) })} className='input-field'>
                                <option>Select Union</option>
                                {
                                    filterdUnionList.map(union => <option key={union.id} value={union.name}>{union.name}</option>)
                                }
                            </select>
                        </div>
                    }
                    {/* village name section*/}
                    {
                        (selectUnion && conditionThree && conditionTwo && conditionOne) &&
                        <div className='home-page__container__village-section'>
                            <input className='input-field' type="text"  {...register("village")} placeholder="Enter your village name" />
                            <button>SUBMIT</button>
                        </div>
                    }

                </form>
            </div>

        </div>
    );
};

export default Home;