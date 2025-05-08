import { http, HttpResponse } from "msw";

export const handlers = [
	// Intercept the "GET /resource" request.
	http.get("http://localhost:3030/scoops", async () => {
		return HttpResponse.json([
			{
				name: "Chocolate",
				imagePath: "/images/chocolate.png",
			},
			{ name: "Vanilla", imagePath: "/images/vanilla.png" },
		]);
	}),
];
