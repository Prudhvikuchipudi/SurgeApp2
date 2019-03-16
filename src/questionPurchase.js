

export const questionPurchase = [
    {
        name: '1',
        id: 'loan_type',
        type: 'select',
        title: 'What is your loan goal?',
        content: [
            {
                content: 'Purchase'
            },
            {
                content: 'Refinance'
            },
            {
                content: 'Equity'
            },
            {
                content: 'Reverse Mortgage'
            }
        ]

    },
    {
        name: '2',
        type: 'select',
        id: "building_type",
        title: 'What type of property?',
        content: [
            {
                content: 'House'
            },
            {
                content: 'Townhome/Duplex'
            },
            {
                content: 'Condominium'
            },
            {
                content: 'Multi-Family'
            },
            {
                content: 'Mobile'
            }
        ],
        placeholder: 'Enter your name',
    },
    {
        name: '3',
        type: 'selinputect',
        id: 'credit',
        title: 'What is your current credit score?',
        content: '',
        placeholder: 'Enter credit score',

    },
    {
        name: '4',
        type: 'input',
        id: 'states',
        title: 'Which state do you reside in?',
        content: '',
        placeholder: 'Enter state',
    },
    {
        name: '5',
        type: 'select',
        id: 'military',
        title: 'Are you or your spouse in the military?',
        content: [
            {
                content: 'Yes'
            },
            {
                content: 'No'
            }
        ],

    },
    {
        name: '6',
        type: 'input',
        id: 'amount',
        title: 'What is the purchase price of your property?',
        content: '',
        placeholder: 'Price',
    },
    {
        name: '7',
        type: 'input',
        id: 'debt',
        title: 'On average, what is your monthly payment towards debt?',//this could be changed to yearly ask
        content: '',
        placeholder: 'debt',
    },
    {
        name: '8',
        type: 'input',
        id: 'downPayment',
        title: 'How much are you putting for a down payment?',
        content: '',
        placeholder: 'downPayment',
    },
    {
        name: '9',
        type: 'input',
        id: 'income',
        title: 'What is your household annual income?',
        content: '',
        placeholder: 'income',
    },
    {
        name: '10',
        type: 'select',
        id: 'bankruptcy',
        title: 'Have you declared bankruptcy or faced forclosure in the last 2 years?',
        content: [
            {
                content: 'Yes'
            },
            {
                content: 'No'
            }
        ],
        placeholder: 'bankruptcy',
    }
];
