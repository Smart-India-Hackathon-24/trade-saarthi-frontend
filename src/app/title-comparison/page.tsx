"use client";
import Button from "@/components/Common/Buttons";
import InputField from "@/components/Common/Inputs";

export default function Similarity() {

    return (
        <>
            <h1>
                <form className="max-w-lg mx-auto mt-10 text-white shadow-md rounded-lg p-6"

                >
                    <InputField label="Name" type="text" name="name" placeholder="Enter Name" required />
                    <InputField label="Title " step="0.01" type="number" name="title" placeholder="Enter title (In float)" required />
                    <InputField label="Meta" step="0.01" type="number" name="meta" placeholder="Enter meta (In float)" required />
                    <Button text="Submit" type="submit" classname="my-2 " />
                </form>
            </h1>


        </>
    )
}