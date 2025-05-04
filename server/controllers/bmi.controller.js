const sql = require('mssql');

const saveBMI = async(req, res) => {
    try {
        const { userId, weight, height } = req.body;
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

        const request = new sql.Request();
        const result = await request
            .input('userId', sql.Int, userId)
            .input('weight', sql.Decimal(5, 2), weight)
            .input('height', sql.Decimal(5, 2), height)
            .input('bmi', sql.Decimal(4, 2), parseFloat(bmi))
            .query('INSERT INTO BMIRecords (UserId, Weight, Height, BMI) VALUES (@userId, @weight, @height, @bmi); SELECT SCOPE_IDENTITY() AS RecordId');

        res.json({
            id: result.recordset[0].RecordId,
            userId,
            weight,
            height,
            bmi: parseFloat(bmi),
            date: new Date()
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBMIHistory = async(req, res) => {
    try {
        const { userId } = req.params;
        const request = new sql.Request();
        const result = await request
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM BMIRecords WHERE UserId = @userId ORDER BY RecordDate DESC');

        res.json(result.recordset);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { saveBMI, getBMIHistory };