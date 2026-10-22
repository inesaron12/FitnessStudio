// Initial data for PulseStudio memberships matching client-side plans
export const membershipsData = [
    {
        slug: 'basic',
        name: 'Day Pass',
        price: '15.00',
        duration: 'per day',
        description: 'Perfect for visitors or flexible training sessions.',
        features: [
            'Access to main gym floor',
            'Locker room & shower access',
            '1 Class included',
        ],
        popular: false,
    },
    {
        slug: 'pro',
        name: 'Pro Member',
        price: '49.00',
        duration: 'per month',
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
        slug: 'vip',
        name: 'Elite VIP',
        price: '89.00',
        duration: 'per month',
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