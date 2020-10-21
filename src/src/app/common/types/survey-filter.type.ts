export interface SurveyFilter {
    filterScope: number;
    id: number;
    recordId: string;
    name: string;
    canFilterOnIncumbent: boolean;
    canFilterOnCompany: boolean;
    values: SurveyFilterValue[];
    selectedValues: SurveyFilterValue[];
    isRegion: boolean;
}

export interface SurveyFilterValue {
    id: number;
    recordId: string;
    value: string;
    children?: SurveyFilterValue[];
    countryName: string;
}
