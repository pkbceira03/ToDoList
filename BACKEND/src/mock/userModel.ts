type MockUserModel = jest.Mock & {
  prototype: { save: jest.Mock };
  find: jest.Mock;
  findById: jest.Mock;
  findByIdAndUpdate: jest.Mock;
  findByIdAndDelete: jest.Mock;
};

const mockUserModel: MockUserModel = jest.fn().mockImplementation((userData) => {
  return {
    ...userData,
    _id: '1',
    save: jest.fn().mockResolvedValue({
      _id: '1',
      ...userData,
    }),
  };
}) as unknown as MockUserModel;

// Métodos estáticos
mockUserModel.find = jest.fn().mockResolvedValue([]);
mockUserModel.findById = jest.fn().mockResolvedValue(null);
mockUserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
mockUserModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

export default mockUserModel;
