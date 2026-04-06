const FinRecordModel = require("../model/recordModel");

module.exports.createRecord = (req, res) => {
  const { amount, type, category, description } = req.body;
  console.log(type);

  const data = new FinRecordModel({
    amount: amount,
    type: type,
    category: category,
    description: description,
  });

  data.save();
  res.json({ response: "record created successfully" });
};

module.exports.getRecords = async (req, res) => {
  const records = await FinRecordModel.find({}).sort({ date: -1 }); //filters here by date
  res.json({ response: records });
};

module.exports.getARecord = async (req, res) => {
  let { id } = req.params;
  let singleRecord = await FinRecordModel.findById(id);
  res.json({ response: singleRecord });
};

module.exports.updateRecord = async (req, res) => {
  let { id } = req.params;
  let { amount, type, category, description } = req.body;

  let oldRecord = await FinRecordModel.findById(id);

  let updatedRecord = await FinRecordModel.findByIdAndUpdate(
    id,
    {
      amount: amount,
      type: type,
      category: category,
      date: oldRecord.date,
      description: description,
      updated_At: new Date(),
    },
    { runValidators: true, new: true },
  );

  res.json({
    response: "record updated successfully",
    updatedRecord: updatedRecord,
  });
};

module.exports.deleteRecord = async (req, res) => {
  let { id } = req.params;
  await FinRecordModel.findByIdAndDelete(id, {
    runValidators: true,
  });
  res.json({ response: "record deleted successfully" });
};

module.exports.getSomeData = async (req, res) => {
  const today = new Date();

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  const records = await FinRecordModel.find({
    date: { $gte: twoDaysAgo },
  });

  res.json({ response: records });
};
