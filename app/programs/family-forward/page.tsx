import { ProgramDetail } from "@/components/ProgramDetail";
import { getProgram } from "@/lib/programs";
export const metadata = { title: "Family Forward" };
export default function Page(){return <ProgramDetail program={getProgram("family-forward")!}/>}
