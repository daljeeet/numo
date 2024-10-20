import type { FormDataa } from "@/app/compatibility/page";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { ScoreChart } from "./ScoreChart";

export function ScoreDialogContent({
	show,
	setShow,
	data,
}: {
	show: boolean;
	setShow: (show: boolean) => void;
	data: FormDataa;
}) {
	const [score, setScore] = useState(0);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const stepOne = checkMulankCompatibility(data.her_dob, data.his_dob);
		setScore((val) => val + stepOne);
		const stepTwo = atleastOneNumberisShared(data.her_dob, data.his_dob);
		setScore((val) => val + stepTwo);
		const stepThree = 20;
		setScore((val) => val + stepThree);
		const stepFour = 20;
		setScore((val) => val + stepFour);
		const stepFive = 20;
		setScore((val) => val + stepFive);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkMulankCompatibility = (dob1: string, dob2: string) => {
		const mulankOne = dob1.slice(-2);
		const mulankTwo = dob2.slice(-2);
		const mul1 = mulankOne.split("")[0] + mulankOne.split("")[1];
		const mul2 = mulankTwo.split("")[0] + mulankTwo.split("")[1];
		const one = Number(mul1.split("")[0]) + Number(mul1.split("")[1]);
		const two = Number(mul2.split("")[0]) + Number(mul2.split("")[1]);
		if (isFrendly(one.toString(), two.toString())) {
			return 19;
		}
		return 1;
	};
	const isFrendly = (mulankOne: string, mulankTwo: string) => {
		switch (mulankOne) {
			case "1":
				if (
					mulankTwo === "2" ||
					mulankTwo === "3" ||
					mulankTwo === "1" ||
					mulankTwo === "5" ||
					mulankTwo === "6" ||
					mulankTwo === "9"
				) {
					return true;
				}
				break;
			case "2":
				if (
					mulankTwo === "1" ||
					mulankTwo === "2" ||
					mulankTwo === "3" ||
					mulankTwo === "5"
				) {
					return true;
				}
				break;
			case "3":
				if (
					mulankTwo === "1" ||
					mulankTwo === "2" ||
					mulankTwo === "3" ||
					mulankTwo === "5" ||
					mulankTwo === "7"
				) {
					return true;
				}
				break;
			case "4":
				if (
					mulankTwo === "1" ||
					mulankTwo === "7" ||
					mulankTwo === "5" ||
					mulankTwo === "6" ||
					mulankTwo === "8"
				) {
					return true;
				}
				break;
			case "5":
				if (
					mulankTwo === "1" ||
					mulankTwo === "2" ||
					mulankTwo === "3" ||
					mulankTwo === "6"
				) {
					return true;
				}
				break;
			case "6":
				if (
					mulankTwo === "1" ||
					mulankTwo === "7" ||
					mulankTwo === "5" ||
					mulankTwo === "6"
				) {
					return true;
				}
				break;
			case "7":
				if (
					mulankTwo === "1" ||
					mulankTwo === "3" ||
					mulankTwo === "5" ||
					mulankTwo === "6" ||
					mulankTwo === "4"
				) {
					return true;
				}
				break;
			case "8":
				if (
					mulankTwo === "7" ||
					mulankTwo === "3" ||
					mulankTwo === "5" ||
					mulankTwo === "6" ||
					mulankTwo === "4"
				) {
					return true;
				}
				break;
			case "9":
				if (mulankTwo === "1" || mulankTwo === "3" || mulankTwo === "5") {
					return true;
				}
				break;
			default:
				return false;
		}
	};
	const atleastOneNumberisShared = (dob1: string, dob2: string) => {
		const arr1 = dob1.split("-").join("").split("");
		const arr2 = dob2.split("-").join("").split("");
		if (isOneNumberShared(arr1, arr2)) {
			return 20;
		}
		return 0;
	};
	function isOneNumberShared(array1: string[], array2: string[]) {
		const set1 = new Set(array1);
		const set2 = new Set(array2);
		for (const num of Array.from(set1)) {
			if (!set2.has(num)) {
				return true;
			}
		}
		for (const num of Array.from(set2)) {
			if (!set1.has(num)) {
				return true;
			}
		}
		return false;
	}
	return (
		<Dialog open={show} onOpenChange={setShow}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Your Compatibility Score</DialogTitle>
					<DialogDescription>
						based on the DOB and name, we have calculated your compatibility
						score
					</DialogDescription>
				</DialogHeader>
				<div className="w-full flex justify-center items-center my-10">
					<ScoreChart score={score} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
