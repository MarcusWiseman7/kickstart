// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract CampaignFactory {
	address[] public deployedCampaigns;

	function createCampaign(uint256 minimum) public {
		address newCampaign = address(new Campaign(minimum, msg.sender));
		deployedCampaigns.push(newCampaign);
	}

	function getDeployedCampaigns() public view returns (address[] memory) {
		return deployedCampaigns;
	}
}

contract Campaign {
	struct Request {
		string description;
		uint256 value;
		address payable recipient;
		bool complete;
		uint256 approvalCount;
		mapping(address => bool) approvals;
	}

	address public manager;
	uint256 public minimumContribution;
	mapping(address => bool) public approvers;
	uint256 public approversCount;
	uint256 public numRequests;
	mapping(uint256 => Request) public requests;

	modifier isManager() {
		require(msg.sender == manager);
		_;
	}

	modifier isApprover() {
		require(approvers[msg.sender]);
		_;
	}

	constructor(uint256 minimum, address creator) {
		manager = creator;
		minimumContribution = minimum;
	}

	function contribute() public payable {
		require(msg.value > minimumContribution);

		approvers[msg.sender] = true;
		approversCount++;
	}

	function createRequest(
		string memory description,
		uint256 value,
		address payable recipient
	) public isManager {
		Request storage r = requests[numRequests++];
		r.description = description;
		r.value = value;
		r.recipient = recipient;
		r.complete = false;
		r.approvalCount = 0;
	}

	function approveRequest(uint256 numRequest) public isApprover {
		Request storage r = requests[numRequest];
		require(!r.approvals[msg.sender]);

		r.approvals[msg.sender] = true;
		r.approvalCount++;
	}

	function finalizeRequest(uint256 numRequest) public isManager {
		Request storage r = requests[numRequest];
		require(!r.complete);
		require(r.approvalCount > (approversCount / 2));

		r.recipient.transfer(r.value);
		r.complete = true;
	}

	function getSummary()
		public
		view
		returns (
			uint256,
			uint256,
			uint256,
			uint256,
			address
		)
	{
		return (minimumContribution, address(this).balance, numRequests, approversCount, manager);
	}

	function getRequestsCount() public view returns (uint256) {
		return numRequests;
	}
}
