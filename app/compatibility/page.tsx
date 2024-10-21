"use client";
import { ScoreDialogContent } from "@/components/score-dialog-content";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Banner from "@/assets/banner-bg.png";
import Logo from "@/assets/logo1.svg";

export interface FormDataa {
	his_name: string;
	his_dob: string;
	her_name: string;
	her_dob: string;
}
const Compatibility = () => {
	const { register, handleSubmit, reset } = useForm<FormDataa>();
	const [show, setShow] = useState(false);
	const [data, setData] = useState<FormDataa | null>(null);

	const onsubmit = async (data: FormDataa) => {
		try {
			const response = await fetch("https://numrologyproject.glitch.me/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data, time: new Date() }),
			});
			if (response.ok) {
				setData(data);
				reset();
			}
		} catch (error) {
			console.log({ error });
		}
	};
	return (
		<>
			<div className="h-screen bg-black/80">
				<div className="bg-primary p-2">
					<Image src={Logo} alt="logo" width={120} height={50} />
				</div>
				<div className="relative">
					<Image
						src={Banner}
						alt="banner"
						layout="contain"
						className="w-full h-full absolute z-0"
					/>
					<div className="p-8 text-white z-10 relative">
						<p className="my-4 text-center">
							Check Relation Compatibility between you and your partner for free
						</p>
						<form
							className="flex flex-col gap-8"
							onSubmit={handleSubmit(onsubmit)}
						>
							<div className="flex flex-col gap-6 border rounded-lg px-4 py-8">
								<input
									type="text"
									{...register("his_name")}
									className="bg-black/80 border rounded-lg p-2 outline-none"
									placeholder="His Name"
									required
								/>
								<input
									type="date"
									{...register("his_dob")}
									className="bg-black/80 border rounded-lg p-2 outline-none"
									placeholder="Your DOB"
									max={new Date("01/01/2007").toISOString().split("T")[0]}
									min={new Date("01/01/1960").toISOString().split("T")[0]}
									required
								/>
							</div>
							<div className="flex flex-col gap-6 border rounded-lg px-4 py-8">
								<input
									type="text"
									{...register("her_name")}
									className="bg-black/80 border rounded-lg p-2 outline-none"
									placeholder="Her Name"
									required
								/>
								<input
									type="date"
									{...register("her_dob")}
									className="bg-black/80 border rounded-lg p-2 outline-none"
									max={new Date("01/01/2007").toISOString().split("T")[0]}
									min={new Date("01/01/1960").toISOString().split("T")[0]}
									required
								/>
							</div>

							<div>
								<Button className="w-full" onClick={() => setShow(true)}>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{show && data && (
				<ScoreDialogContent setShow={setShow} show={show} data={data} />
			)}
		</>
	);
};

export default Compatibility;
