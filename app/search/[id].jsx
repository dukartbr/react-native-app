import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	View,
} from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Text, SafeAreaView } from "react-native";
import axios from "axios";
import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import styles from "../../styles/search";

export default function JobSearch() {
	const params = useGlobalSearchParams();
	const router = useRouter();

	const [searchResult, setSearchResult] = useState([]);
	const [searchLoader, setSearchLoader] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [page, setPage] = useState(1);

	async function handleSearch() {
		setSearchLoader(true);
		setSearchResult([]);

		try {
			const options = {
				method: "GET",
				url: `https://jsearch.p.rapidapi.com/search`,
				headers: {
					"X-RapidAPI-Key":
						"6568ee9edbmsh0644457251a6d43p19b1bbjsncf1c083cc72d",
					"X-RapidAPI-Host": "jsearch.p.rapidapi.com",
				},
				params: {
					query: params.id,
					page: page.toString(),
				},
			};

			const response = await axios.request(options);
			setSearchResult(response.data.data);
		} catch (error) {
			setSearchError(error);
			console.log(error);
		} finally {
			setSearchLoader(false);
		}
	}

	function handlePagination(direction) {
		if (direction === "left" && page > 1) {
			setPage(page - 1);
			handleSearch();
		} else if (direction === "right") {
			setPage(page + 1);
			handleSearch();
		}
	}

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension="60%"
							handlePress={() => router.back()}
						/>
					),
					headerTitle: "",
				}}
			/>
			<FlatList
				data={searchResult}
				renderItem={({ item }) => (
					<NearbyJobCard
						job={item}
						handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
					/>
				)}
				keyExtractor={(item) => item.job_id}
				contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
				ListHeaderComponent={() => (
					<>
						<View style={styles.container}>
							<Text style={styles.searchTitle}>{params.id}</Text>
							<Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
						</View>
						<View style={styles.loaderContainer}>
							{searchLoader ? (
								<ActivityIndicator size="large" color={COLORS.primary} />
							) : (
								searchError && <Text>Oops Something went wrong</Text>
							)}
						</View>
					</>
				)}
				ListFooterComponent={() => (
					<View style={styles.footerContainer}>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination("left")}
						>
							<Image
								source={icons.chevronLeft}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<View style={styles.paginationTextBox}>
							<Text style={styles.paginationText}>{page}</Text>
						</View>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination("right")}
						>
							<Image
								source={icons.chevronRight}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
