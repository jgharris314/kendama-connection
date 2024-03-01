const BasicMemberhsipCreationLimit = 5

const MembershipCreationLimits = {
  basic: BasicMemberhsipCreationLimit,
  owner: 100,
  local_host: 10,
  major_host: 25,
  company: 25,
}

module.exports = {
  BasicMemberhsipCreationLimit,
  MembershipCreationLimits,
}
