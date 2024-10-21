"use client";
import Image from "next/image";
import Logo from "@/assets/logo1.svg";
import Banner from "@/assets/banner-bg.png";
import { Button } from "@/components/ui/button";
import FooterImg from "@/assets/footer.png";
import HoroscopeImg from "@/assets/horoscrpe.png";
import AstroImg from "@/assets/astro.png";
import { useRouter } from "next/navigation";
export default function Home() {
	const navigate = useRouter();
	return (
		<div className="h-screen bg-black/80 lg:hidden">
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
					<h3 className="text-xl text-center my-4">
						Discover Your Relationship Compatibility Through Numerology
					</h3>
					<p className="text-xs text-center">
						Check your numerology score to see if you are compatible with your
						partner. Just by entering your Date of Birth. <br /> No login
						required
					</p>
					<div className="flex justify-around items-center my-6">
						<Button onClick={() => navigate.push("/compatibility")}>
							Check Compatibility Score
						</Button>
					</div>
				</div>
			</div>
			<Image src={AstroImg} alt="footer image" priority />
			<Image src={HoroscopeImg} alt="footer image" priority />
			<Image src={FooterImg} alt="footer image" priority />
		</div>
	);
}
