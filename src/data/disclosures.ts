export type DisclosureType = 'link' | 'file' | 'na';

export type DisclosureItem = {
	srNo: number;
	particulars: string;
	/** Text shown in the UI (e.g. "Link", "File", "Not Applicable", "NA"). Never render a raw URL. */
	reference: string | null;
	/** Actual destination used for navigation on click. null when there is nothing to link to. */
	url: string | null;
	type: DisclosureType;
};

export const disclosureItems: DisclosureItem[] = [
	{
		srNo: 1,
		particulars: 'Details of business',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/about',
		type: 'link',
	},
	{
		srNo: 2,
		particulars: 'Memorandum of Association and Articles of Association',
		reference: 'Link',
		url: '/FINAL MOA AOA.pdf',
		type: 'file',
	},
	{
		srNo: 3,
		particulars:
			'Brief profile of board of directors including directorship and full-time positions in body corporates',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/about',
		type: 'link',
	},
	{
		srNo: 4,
		particulars: 'Terms and Conditions of appointment of Independent Directors',
		reference: 'Link',
		url: 'https://aohbxbbayvrynllpdzyr.supabase.co/storage/v1/object/public/investor-documents/1787292947071-Terms--Conditions-of-appointment-of-Independent-Director.pdf',
		type: 'link',
	},
	{
		srNo: 5,
		particulars: 'Composition of various committees of Board of Directors',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/about',
		type: 'link',
	},
	{
		srNo: 6,
		particulars:
			'Code of Conduct of Board of Directors and Senior Management Personnel',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/policy',
		type: 'link',
	},
	{
		srNo: 7,
		particulars: 'Details of Establishment of Vigil Mechanism/ Whistle Blower Policy',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/policy',
		type: 'link',
	},
	{
		srNo: 8,
		particulars:
			'Criteria of making payments to Non-Executive Directors, if the same has not been disclosed in annual report',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/policy',
		type: 'link',
	},
	{
		srNo: 9,
		particulars: 'Policy on dealing with related party transactions (RPT)',
		reference: 'Link',
		url: 'https://aohbxbbayvrynllpdzyr.supabase.co/storage/v1/object/public/investor-documents/1787292939591-Related-party-Transactions-policy.pdf',
		type: 'link',
	},
	{
		srNo: 10,
		particulars: "Policy for determining 'material' subsidiaries",
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 11,
		particulars: 'Details of familiarization programmes imparted to Independent Directors',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/policy',
		type: 'link',
	},
	{
		srNo: 12,
		particulars: 'The email address for grievance redressal and other relevant details',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/contact',
		type: 'link',
	},
	{
		srNo: 13,
		particulars:
			'Contact information of the designated officials of the listed entity who are responsible for assisting and handling investor grievances',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/contact',
		type: 'link',
	},
	{
		srNo: 14,
		particulars:
			'Notice of meeting of the Board of Directors where financial results shall be discussed',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/updates-announcements',
		type: 'link',
	},
	{
		srNo: 15,
		particulars:
			'Financial Results, on conclusion of the meeting of the board of directors where the financial results were approved',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/financial-results',
		type: 'link',
	},
	{
		srNo: 16,
		particulars: 'Annual Report',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/annual-reports',
		type: 'link',
	},
	{
		srNo: 17,
		particulars: 'Shareholding Pattern',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/shareholding-pattern',
		type: 'link',
	},
	{
		srNo: 18,
		particulars:
			'Details of agreements entered into with the media companies and/or their associates, etc',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 19,
		particulars: 'Schedule of analysts or institutional investors meet',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 20,
		particulars:
			'Presentations prepared by the listed entity for analysts or institutional investors meet, post earnings or quarterly calls',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 21,
		particulars:
			'Audio recordings, video recordings, if any, and transcripts of post earnings or quarterly calls',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 22,
		particulars:
			'New name and the old name of the listed entity for a continuous period of one year, from the date of the last name change',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 23,
		particulars: 'Financial results published in newspaper',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/updates-announcements',
		type: 'link',
	},
	{
		srNo: 24,
		particulars: 'Credit Ratings',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 25,
		particulars: 'Separate Audited Financial Statements of each subsidiary',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 26,
		particulars: 'Secretarial Compliance Report',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 27,
		particulars: 'Policy for determination of materiality of events or information',
		reference: 'Link',
		url: 'https://aohbxbbayvrynllpdzyr.supabase.co/storage/v1/object/public/investor-documents/1787292894751-Policy-for-determination-of-materiality-of-event-or-information.pdf',
		type: 'link',
	},
	{
		srNo: 28,
		particulars:
			'Contact details of Key Managerial Personnel who are authorized for the purpose of determining materiality of an event or information',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/contact',
		type: 'link',
	},
	{
		srNo: 29,
		particulars: 'Disclosures under Regulation 30 of SEBI (LODR) Regulations, 2015',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/updates-announcements',
		type: 'link',
	},
	{
		srNo: 30,
		particulars: 'Statements of deviation(s) or variation(s)',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 31,
		particulars: 'Dividend Distribution Policy',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
	{
		srNo: 32,
		particulars: 'Annual Return',
		reference: 'Link',
		url: 'https://krishna-filament.vercel.app/ir/annual-reports',
		type: 'link',
	},
	{
		srNo: 33,
		particulars: 'Employee Benefit Scheme Documents',
		reference: 'Not Applicable',
		url: null,
		type: 'na',
	},
];