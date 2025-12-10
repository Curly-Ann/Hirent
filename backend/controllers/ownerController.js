const Item = require("../models/Item");
const Bookings = require("../models/Bookings");

// GET owner stats
const getStats = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Count total listings for this owner
        const totalListings = await Item.countDocuments({ owner: userId });

        // Calculate monthly earnings from bookings
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const monthlyBookings = await Bookings.find({
            owner: userId,
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            },
            paymentStatus: "paid"
        });

        const monthlyEarnings = monthlyBookings.reduce((total, booking) => {
            return total + (booking.totalPrice || 0);
        }, 0);

        res.json({
            success: true,
            stats: {
                totalListings,
                monthlyEarnings
            }
        });
    } catch (error) {
        console.error('[GET STATS] Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stats'
        });
    }
};

module.exports = {
    getStats
};
