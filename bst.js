class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(array) {
		const sortedUniqueArray = this.sortArray(array);
		this.root = this.buildTree(
			sortedUniqueArray,
			0,
			sortedUniqueArray.length - 1
		);
		this.array = array;
	}

	buildTree(array, start, end) {
		// Base case: If the subarray is empty, return null
		if (start > end) {
			return null;
		}

		// Find the midpoint index within the current subarray
		let midPoint = Math.floor((start + end) / 2);
		// console.log(array[midPoint]);

		// Create a root node with the value at the midpoint
		let rootNode = new Node(array[midPoint]);

		// Recursively build the left and right subtrees
		rootNode.left = this.buildTree(array, start, midPoint - 1); // Left subtree (before midpoint)
		rootNode.right = this.buildTree(array, midPoint + 1, end); // Right subtree (after midpoint)

		// Step 4: Return the root node
		return rootNode;
	}

	sortArray(array) {
		const processedArray = [...new Set(array)].sort((a, b) => a - b);
		return processedArray;
	}

	insert(value) {
		// Step 1: If the tree is empty, create the root node
		if (!this.root) {
			// If there's no root, the tree is empty, so we set the root to a new node with the given value
			this.root = new Node(value);
			return;
		}

		// Step 2: Start traversing the tree from the root
		let current = this.root;

		// Step 3: Traverse the tree to find the correct spot for the new value
		while (current) {
			// Step 3a: Check if the value already exists in the tree
			if (current.value === value) {
				return;
			}

			// Step 3b: If the new value is smaller than the current node's value, go left
			if (value < current.value) {
				// If the left child does not exist, create a new node there
				if (!current.left) {
					current.left = new Node(value);
					return;
				}
				current = current.left;
			}
			// Step 3c: If the new value is greater than the current node's value, go right
			else if (value > current.value) {
				// If the right child does not exist, create a new node there
				if (!current.right) {
					current.right = new Node(value);
					return;
				}
				current = current.right;
			}
		}
	}

	deleteItem(value) {
		// Check if the tree is empty (i.e., no root node).
		if (!this.root) {
			return; // No node to delete, exit the function.
		}

		// Helper function to find the smallest node in the right subtree.
		// This node will be the in-order successor, used for replacing a node with two children.
		const getSuccessor = (node) => {
			// Traverse left until the leftmost node is found (smallest node).
			while (node.left) {
				node = node.left;
			}
			return node; // Return the leftmost (smallest) node.
		};

		// Recursive helper function to delete a node in the tree.
		const deleteNode = (node, value) => {
			// Base case: if node is null, return null (value not found).
			if (!node) return null;

			// Traverse the tree based on the value to delete.
			if (value < node.value) {
				// Value is smaller than the current node's value, so search the left subtree.
				node.left = deleteNode(node.left, value);
			} else if (value > node.value) {
				// Value is larger than the current node's value, so search the right subtree.
				node.right = deleteNode(node.right, value);
			} else {
				// Node to be deleted is found.

				// Case 1: Node is a leaf (no children), return null to remove it.
				if (!node.left && !node.right) return null;

				// Case 2: Node has only one child (left or right), replace the node with its child.
				if (!node.left) return node.right; // No left child, replace with right child.
				if (!node.right) return node.left; // No right child, replace with left child.

				// Case 3: Node has two children, replace it with the in-order successor.
				let successor = getSuccessor(node.right); // Find the in-order successor (smallest in the right subtree).
				node.value = successor.value; // Replace the current node's value with the successor's value.

				// Recursively delete the successor (it might have at most one child).
				node.right = deleteNode(node.right, successor.value);
			}

			// Return the updated node after deletion or replacement.
			return node;
		};

		// Start the deletion process from the root of the tree.
		this.root = deleteNode(this.root, value);
	}

	find(value) {
		// Start traversal from the root node
		let currentNode = this.root;

		// If the tree is empty, return null
		if (!currentNode) {
			return null;
		}

		// Traverse the tree iteratively
		while (currentNode) {
			// Check if the current node holds the target value
			if (value === currentNode.value) {
				return currentNode;
			}

			// Move to the left subtree if the value is smaller
			if (value < currentNode.value) {
				currentNode = currentNode.left;
			}
			// Move to the right subtree if the value is larger
			else if (value > currentNode.value) {
				currentNode = currentNode.right;
			}
		}

		// If the value is not found in the tree, return null
		return null;
	}

	//  Traverse the tree in breadth-first level order
	levelOrder(callback) {
		// Validate the callback function
		if (typeof callback !== "function") {
			throw new Error("Callback is not a function.");
		}

		// If the tree is empty, there's nothing to traverse
		if (!this.root) {
			return;
		}

		// Initialize the queue and add the root node to start
		const queue = [];
		queue.push(this.root);

		// Loop while there are nodes to process
		while (queue.length > 0) {
			// Remove the first node in the queue (FIFO)
			let current = queue.shift();

			// Call the callback function with the current node
			callback(current);

			// Add the left and right children to the queue if they exist
			if (current.left) {
				queue.push(current.left);
			}
			if (current.right) {
				queue.push(current.right);
			}
		}
	}

	// Traverses the tree in **pre-order** (root → left → right).
	// Visits the current node first, then recursively visits the left and right subtrees.
	preOrder(callback, node = this.root) {
		if (typeof callback !== "function") {
			throw new Error("Callback is not a function.");
		}

		if (!node) {
			return; // Base case for recursion
		}

		callback(node); // Process current node
		this.preOrder(callback, node.left); // Traverse left subtree
		this.preOrder(callback, node.right); // Traverse right subtree
	}

	// Traverses the tree in **in-order** (left → root → right).
	// Visits the left subtree first, then the current node, and finally the right subtree.
	// Commonly used for binary search trees to retrieve nodes in sorted order.
	inOrder(callback, node = this.root) {
		if (typeof callback !== "function") {
			throw new Error("Callback is not a function.");
		}

		if (!node) {
			return; // Base case for recursion
		}

		this.inOrder(callback, node.left); // Traverse left subtree
		callback(node); // Process current node
		this.inOrder(callback, node.right); // Traverse right subtree
	}

	// Traverses the tree in **post-order** (left → right → root).
	// Visits the left subtree first, then the right subtree, and finally the current node.
	// Often used for tasks like deleting or freeing nodes after processing child nodes.
	postOrder(callback, node = this.root) {
		if (typeof callback !== "function") {
			throw new Error("Callback is not a function.");
		}

		if (!node) {
			return; // Base case for recursion
		}

		this.postOrder(callback, node.left); // Traverse left subtree
		this.postOrder(callback, node.right); // Traverse right subtree
		callback(node); // Process current node
	}

	// Returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
	height(node) {
		// Base case: If the node is null (e.g., empty subtree),
		// the height is considered -1 because there's no node present.
		if (!node) {
			return -1;
		}

		// Recursively calculate the height of the left subtree.
		// This will return the height of the deepest node in the left subtree.
		const leftHeight = this.height(node.left);

		// Recursively calculate the height of the right subtree.
		// This will return the height of the deepest node in the right subtree.
		const rightHeight = this.height(node.right);

		// The height of the current node is one more than the maximum height
		// of its left and right subtrees.
		// Add 1 to account for the current node itself.
		return 1 + Math.max(leftHeight, rightHeight);
	}

	// Returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
	depth(node) {
		// Handle edge cases: tree is empty or input node is null.
		if (!this.root || !node) {
			return -1;
		}

		let currentNode = this.root; // Start traversal from the root.
		let nodeDepth = 0;

		// Traverse the tree iteratively to locate the target node.
		while (currentNode) {
			// If the target node is found, return the current depth.
			if (node.value === currentNode.value) {
				return nodeDepth;
			}

			// Move to the left or right subtree based on the node's value.
			nodeDepth++; // Increment depth for each level of traversal.
			currentNode =
				node.value < currentNode.value ? currentNode.left : currentNode.right;
		}

		// If the node is not found, return -1.
		return -1;
	}

	// Checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
	isBalanced() {
		// Check if the tree is empty
		if (!this.root) {
			return true; // An empty tree is balanced by definition
		}

		// Helper function to check the balance of a subtree
		const checkBalance = (node) => {
			// Base case: If the node is null, return a height of -1 and balanced = true
			// A null node is considered balanced and its height is -1
			if (!node) return { height: -1, balanced: true };

			const left = checkBalance(node.left);
			const right = checkBalance(node.right);

			// Check if the current node is balanced:
			const balanced =
				left.balanced && // Left subtree must be balanced
				right.balanced && // Right subtree must be balanced
				Math.abs(left.height - right.height) <= 1; // Height difference must be <= 1

			// Calculate the height of the current node:
			// - It's the maximum height of the left or right subtree, plus 1 for the current node itself
			const height = Math.max(left.height, right.height) + 1;

			// Return an object containing the height and balance status of the current node
			return { height, balanced };
		};

		// Start checking balance from the root node
		// The helper function will return an object { height, balanced }
		// We are only interested in the balanced property of the root node
		return checkBalance(this.root).balanced;
	}

	rebalance() {
		// Step 1: Check if the tree is already balanced
		if (this.isBalanced()) {
			// If the tree is balanced, there's no need to rebalance it.
			return "Tree is already balanced.";
		}

		// Step 2: Perform an in-order traversal to collect node values
		// In-order traversal retrieves node values in sorted order
		// for a Binary Search Tree.
		const nodes = [];
		this.inOrder((node) => nodes.push(node.value)); // Traverse and collect values in sorted order.

		// Step 3: Rebuild the tree using the sorted node values
		// The `buildTree` function creates a balanced tree from a sorted array.
		this.root = this.buildTree(nodes, 0, nodes.length - 1);

		// Return a message to confirm that the tree has been rebalanced.
		return "Tree has been rebalanced";
	}
}
