export interface CountryProgram {
  title: string;
  desc: string;
  href: string;
}

export const countryPrograms: CountryProgram[] = [
  {
    title: "미국 교과·AP",
    desc: "G1–G12 English Math, Algebra Geometry Calculus, AP",
    href: "/quote-us",
  },
  {
    title: "영국",
    desc: "Year 1–13, GCSE, A-level, 11+, ISEB, UKiset",
    href: "/quote-uk",
  },
  {
    title: "캐나다",
    desc: "Grade 1–12 English Math, senior streams",
    href: "/quote-ca",
  },
  {
    title: "호주",
    desc: "Foundation–Year 12 English Maths, Methods / Specialist",
    href: "/quote-au",
  },
];
