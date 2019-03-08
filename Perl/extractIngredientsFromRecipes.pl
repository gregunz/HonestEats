#!/usr/bin/perl

#########################################################################################
# Extracts ingredient sets from recipe HTML pages, using hand-crafted regular expressions
#########################################################################################

use Digest::MD5 qw(md5 md5_hex md5_base64);

$RECIPE_PAGES_PATH = "../data/recipePages";
$RECIPE_LIST_FILE = "../data/msg_clean.txt";

sub readFile {
	my $filename = shift;
	open(FILE, $filename) or return ""; 
	my $string = join("", <FILE>);
	# remove the header line from the file content, such that files with only this line result in "":
	$string =~ s/^<!--.*-->\n//;
	close(FILE);
	return $string;
}

sub computeDomain {
	my $url = shift;
	my $domain = $url;
	$domain =~ s|^http://(www.)?||;
	$domain =~ s|/.*$||;
	return $domain;
}

sub cleanHtml {
	my $html = shift;
	$html =~ s/<br *\/?>/ /g;
	$html =~ s/<.+?>//g;
	$html =~ s/&nbsp;/ /g;
	$html =~ s/\s+/ /sg;
	$html =~ s/^\s+//;
	$html =~ s/\s+$//;
	return $html;
}

sub printOutput {
	my $hash = shift;
	my $url = shift;
	my $title = shift;
	$title =~ s/\s+/ /g;
	$title =~ s/^ //g;
	$title =~ s/ $//g;
	my $ingredientArray_ref = shift;
	my $ingredientString = join("|", @$ingredientArray_ref);
	$ingredientString =~ s/\|+/\|/g;
	$ingredientString =~ s/^\|//g;
	$ingredientString =~ s/\|$//g;
	print "$hash.html\t" . computeDomain($url) . "\t$url\t$title\t$ingredientString\n";
}


my @md5 = ();
my @md5_inv = ();

open(REC, $RECIPE_LIST_FILE) or die $!;
while(my $url = <REC>) {
	chomp $url;
	my $hash = md5_hex($url);
	$md5{$url} = $hash;
	$md5_inv{$hash} = $url;
}
close(REC);

my %goodDomains = (
	"allrecipes.com" => 1,
	"food.com" => 1,
	"yummly.com" => 1,
	"myrecipes.com" => 1,
	"recipes.sparkpeople.com" => 1,
	"bettycrocker.com" => 1,
	"foodnetwork.com" => 1,
	"cdkitchen.com" => 1,
	"eatingwell.com" => 1,
	"delish.com" => 1,
	"cookeatshare.com" => 1,
	"recipe.com" => 1,
	"kraftrecipes.com" => 1,
	"epicurious.com" => 1
	);

my $count = 0;

# - means file not found or without valid HTML content
# ? means no match in file
foreach my $url (keys %md5) {
	my $domain = computeDomain($url);
	++$count;
	print STDERR "$count\n" if ($count % 1000 == 0);
	next if (!defined($goodDomains{$domain}));
	if ($domain eq "allrecipes.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li class="plaincharacterwrap ingredient">\s*(.+?)</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>\s*(.*?) - (Allrecipes\.com|All Recipes).*?</title>}s) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "food.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li class="ingredient" +itemprop="ingredients">\s*<span class="ingredient">(.+?)</span>\s*</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*) - Food.com( - )?.*</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "yummly.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<div class="yRecipeIngredientLine">\s*<span itemprop="ingredients" class="ingredient">(.+?)\s*</div>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*) \| Yummly</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "myrecipes.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li itemprop="ingredient" itemscope itemtype="http://data-vocabulary.org/RecipeIngredient">\s*(.+?)\s*</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*) [\|-] MyRecipes\.com</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "recipes.sparkpeople.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<span itemprop="name">(.*?)</span>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*)</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "bettycrocker.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<dl class="ingredient" itemprop="ingredients">(.+?)</dl>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>\s*(.*?) (Recipe from Betty Crocker|- Betty Crocker|from BettyCrocker\.com)\s*</title>}s) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "foodnetwork.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li class="ingredient">(.+?)</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*)</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "cdkitchen.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<span class="abc">(.+?)</span>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?)( from CDKitchen\.com| - CDKitchen)?</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "eatingwell.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li itemprop="ingredients">(.*?)</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?) \| Eating Well</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "delish.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li class="ingredient">(.+?)</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?) - Delish\.com</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "cookeatshare.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<span class="ingredient">(.+?)</span>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?) - CookEatShare</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "recipe.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<div class="floatleft itemUnit W420">(.+?)</div>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?)( - )?(Recipe\.com)?</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "kraftrecipes.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<div class="desc">(.+?)</div>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>(.*?)</title>}) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	} elsif ($domain eq "epicurious.com") {
		my $html = readFile("$RECIPE_PAGES_PATH/$md5{$url}.html");
		my @matches = $html =~ m{<li class="ingredient">(.+?)</li>}sg;
		my @ingredients = ();
		foreach my $token (@matches) {
			push(@ingredients, cleanHtml($token));
		}
		my $title = '';
		if ($html =~ m{<title>\s*(.*?)\s*(at Epicurious\.com)</title>}s) {
			$title = $1;
		}
		printOutput($md5{$url}, $url, $title, \@ingredients);
	}
}
