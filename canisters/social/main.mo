import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor PostCrud {
	type PostId = Nat32;
	type Post = {
		creator: Text;
		message: Text;
		rate: Nat8;
	};

	stable var postId: PostId = 0;

	let postList = HashMap.HashMap<Text, Post>(0, Text.equal, Text.hash);

	private func generatePostId() : Nat32 {
		postId += 1;
		return postId;
	};

	public query ({caller}) func whoami() : async Principal {
		return caller;
	};

	public shared (msg) func createPost(message: Text, rate: Nat8) : async () {
		let user: Text = Principal.toText(msg.caller);
		let post = {creator=user; message=message; rate=rate};

		postList.put(Nat32.toText(generatePostId()), post);
		Debug.print("New comment created! ID: " # Nat32.toText(postId));
		return ();
	};

	public query func getPosts () : async [(Text, Post)] {
		let postIter : Iter.Iter<(Text, Post)> = postList.entries();
		let postArray : [(Text, Post)] = Iter.toArray(postIter);

		return postArray;
	};

	public query func getPost (id: Text) : async ?Post {
		let post: ?Post = postList.get(id);
		return post;
	};
}