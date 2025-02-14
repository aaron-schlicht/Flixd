import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants";

interface MovieStatsProps {
  budget: number | undefined;
  revenue: number | undefined;
  original_language: string | undefined;
  production_companies:
    | Array<{
        name: string;
        logo_path: string | null;
      }>
    | undefined;
  production_countries:
    | Array<{
        name: string;
        iso_3166_1: string;
      }>
    | undefined;
}

const MovieStats = ({
  budget,
  revenue,
  original_language,
  production_companies,
  production_countries,
}: MovieStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {!!budget && <StatItem title="Budget" value={formatCurrency(budget)} />}
      {!!revenue && (
        <StatItem title="Revenue" value={formatCurrency(revenue)} />
      )}
      {!!original_language && (
        <StatItem
          title="Original Language"
          value={original_language.toUpperCase()}
        />
      )}
      {!!production_companies && production_companies.length > 0 && (
        <View style={styles.companiesSection}>
          <Text style={styles.sectionTitle}>Production Companies</Text>
          <View style={styles.companiesList}>
            {production_companies.map((company, index) => (
              <Text key={index} style={styles.companyText}>
                {company.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {!!production_countries && production_countries.length > 0 && (
        <View style={styles.countriesSection}>
          <Text style={styles.sectionTitle}>Production Countries</Text>
          <View style={styles.countriesList}>
            {production_countries.map((country, index) => (
              <Text key={index} style={styles.countryText}>
                {country.name}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const StatItem = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  statsGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    marginBottom: 5,
  },
  statTitle: {
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 14,
    marginBottom: 8,
  },
  companiesSection: {
    marginTop: 16,
  },
  companiesList: {
    gap: 4,
  },
  companyText: {
    color: "white",
    fontSize: 14,
  },
  countriesSection: {
    marginTop: 16,
  },
  countriesList: {
    gap: 4,
  },
  countryText: {
    color: "white",
    fontSize: 14,
  },
});

export default MovieStats;
