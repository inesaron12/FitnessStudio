export const plans = [
    {
        id: 'basic',
        name: 'Day Pass',
        price: 15,
        period: 'per day',
        description: 'Perfect for visitors or flexible training sessions.',
        features: [
            'Access to main gym floor',
            'Locker room & shower access',
            '1 Class included',
        ],
        popular: false,
    },
    {
        id: 'pro',
        name: 'Pro Member',
        price: 49,
        period: 'per month',
        description: 'Our most popular choice for committed athletes.',
        features: [
            'Unlimited gym floor access',
            'Unlimited group classes',
            'Free body composition analysis',
            '1 Guest pass per month',
        ],
        popular: true,
    },
    {
        id: 'vip',
        name: 'Elite VIP',
        price: 89,
        period: 'per month',
        description: 'Complete high-performance training experience.',
        features: [
            'All Pro Member perks',
            'Personalized workout plan',
            'Sauna & Recovery lounge access',
            '1 Monthly session with a Head Coach',
        ],
        popular: false,
    },
]