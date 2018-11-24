import 'dart:async';
import 'dart:html';
import 'dart:math';

double window_width;
double window_height;

double total_document_height;
double scroll_background_relative_velocity = 0.2;

double scroll_y_position;

List<CanvasElement> background;
List<double> background_width;
List<double> background_height;
List<double> background_real_width;
List<double> background_real_height;
List<ImageElement> background_images;

Timer timer;
Duration duration;
DateTime last_resizing_time;
DateTime new_last_resizing_time;

void main() {
  background = new List<CanvasElement>();
  background_width = new List<double>();
  background_height = new List<double>();
  background_real_width = new List<double>();
  background_real_height = new List<double>();
  background_images = new List<ImageElement>();

  duration = new Duration(milliseconds: 250);
  last_resizing_time = new DateTime.now();

  window_width = max(document.documentElement.clientWidth.toDouble(), window.innerWidth.toDouble());
  window_height = max(document.documentElement.clientHeight.toDouble(), window.innerHeight.toDouble());

  buildPage();

  window.onResize.listen((e) {
    prepareForRefresh();
  });

  /* il metodo seguente crashava safari (ecco il motivo del try-catch) */
  try {
    window.screen.orientation.onChange.listen((e) {
      window_width = max(document.documentElement.clientWidth.toDouble(), window.innerWidth.toDouble());
      window_height = max(document.documentElement.clientHeight.toDouble(), window.innerHeight.toDouble());
      prepareForRefresh();
    });
  } catch (e) {
    print(e);
  }

  window.onScroll.listen((e) {
    double new_scroll_y_position = window.scrollY.toDouble();
    double old_window_height = window_height;
    window_height = window.innerHeight.toDouble();
    scrollBackground((window_height - old_window_height + new_scroll_y_position - scroll_y_position) * scroll_background_relative_velocity);
    scroll_y_position = new_scroll_y_position;
  });
}

/* Dato che ridimensionando la finestra l'azione viene chiamata tante volte, e che sugli
      smartphone le dimensioni della pagina vengono cambiate molto spesso
     (anche durante lo scrolling), aggiungo un timer, in modo che gli aggiornamenti non
     possano essere temporalmente vicini. In questo modo l'aggiornamento viene lanciato
     solo una volta, dopo l'ultimo ridimensionamento. */
void prepareForRefresh() {
  new_last_resizing_time = new DateTime.now();
  int time_difference = new_last_resizing_time.difference(last_resizing_time).inMilliseconds;
  if (time_difference < duration.inMilliseconds) {
    if (timer != null) {
      timer.cancel();
    }
    timer = new Timer(duration, refreshLayoutOnResize);
  }
  last_resizing_time = new_last_resizing_time;
}

void refreshLayoutOnResize() {
  if (window_width != max(document.documentElement.clientWidth.toDouble(), window.innerWidth.toDouble())) {
    window.location.reload();
  } else {
    window_height = max(document.documentElement.clientHeight.toDouble(), window.innerHeight.toDouble());
    adaptBackgroundsHeight();
  }
}

/* aggiunge un elemento di background, specificando l'immagine, le reali dimensioni dell'immagine e le dimensioni volute */
/*void addBackgroundElement(String image_path, double image_original_width, double image_original_height, double width, double height,
    double total_document_height, double scroll_background_relative_velocity) {
  if (total_document_height > window_height) {
    height = height - (total_document_height - window_height) * height / total_document_height * scroll_background_relative_velocity;
  }

  CanvasElement element = new CanvasElement();
  element.width = width.toInt();
  element.height = height.toInt();
  ImageElement imageElement = new ImageElement();
  imageElement.src = image_path;
  double zoom_factor = width / image_original_width;
  double translate_factor = 0.0;
  double scaled_height = image_original_height * zoom_factor;
  if (scaled_height < height) {
    zoom_factor = height / image_original_height;
    translate_factor = (image_original_width * zoom_factor - width) * 0.5;
  }
  imageElement.onLoad.listen((e) {
    element.context2D.translate(-translate_factor, 0);
    element.context2D.scale(zoom_factor, zoom_factor);
    element.context2D.drawImage(imageElement, 0, 0);
  });

  element.style.zIndex = "-1";
  element.style.position = "absolute";
  element.style.left = ((window_width - width) * 0.5).toString() + "px";
  background_width.add(width);
  background_height.add(height);

  double top = 0.0;
  int n = background.length;
  for (int i = 0; i < n; i++) {
    top = top + background_height[i];
  }
  element.style.top = top.toString() + "px";
  background.add(element);
  document.body.children.add(element);
}*/

/* aggiunge tutti gli elementi di background, specificando per ciascuna immagine il percorso, le reali dimensioni e le dimensioni volute */
void addBackgroundElements(List<String> image_path, List<double> width, List<double> height) {
  int m = image_path.length;

  List<CanvasElement> element = new List<CanvasElement>();

  for (int j = 0; j < m; j++) {
    if (total_document_height > window_height) {
      height[j] =
          height[j] - (total_document_height - window_height) * height[j] / total_document_height * scroll_background_relative_velocity;
    }

    element.add(new CanvasElement());
    element[j].width = width[j].toInt();
    element[j].height = height[j].toInt();
    ImageElement imageElement = new ImageElement();
    imageElement.src = image_path[j];
    double zoom_factor = width[j] / background_real_width[j];
    double translate_factor = 0.0;
    double scaled_height = background_real_height[j] * zoom_factor;
    if (scaled_height < height[j]) {
      zoom_factor = height[j] / background_real_height[j];
      translate_factor = (background_real_width[j] * zoom_factor - width[j]) * 0.5;
    }
    background_images.add(imageElement);
    imageElement.onLoad.listen((e) {
      element[j].context2D.translate(-translate_factor, 0);
      element[j].context2D.scale(zoom_factor, zoom_factor);
      element[j].context2D.drawImage(imageElement, 0, 0);
    });

    element[j].style.zIndex = "-1";
    element[j].style.position = "absolute";
    element[j].style.left = ((window_width - width[j]) * 0.5).toString() + "px";
    background_width.add(width[j]);
    background_height.add(height[j]);

    scroll_y_position = window.scrollY.toDouble();

    double top = scroll_y_position * scroll_background_relative_velocity;
    for (int i = 0; i < j; i++) {
      top = top + background_height[i];
    }
    element[j].style.top = top.toString() + "px";
    background.add(element[j]);
  }
  background_real_width = background_real_width;
  background_real_height = background_real_height;
  /* in questo modo posso aggiungere gli elementi tutti in una volta*/
  document.body.children.addAll(element);
}

void addBackgrounds() {
  background.clear();
  background_width.clear();
  background_height.clear();
  background_images.clear();

  List<String> img_name = ["./images/background1.png", "./images/background2.png", "./images/background3.png"];
  background_real_width = [1920.0, 1920.0, 1920.0];
  background_real_height = [1594.0, 1236.0, 1154.0];
  double width = window_width.toDouble();
  List<double> bkg_width = [width, width, width];
  List<double> bkg_height = [total_document_height * 0.4, total_document_height * 0.29, total_document_height * 0.31];

  addBackgroundElements(img_name, bkg_width, bkg_height);
}

void adaptBackgroundsHeight() {
  int m = background.length;

  List<double> height = [total_document_height * 0.4, total_document_height * 0.29, total_document_height * 0.31];

  for (int j = 0; j < m; j++) {
    if (total_document_height > window_height) {
      height[j] =
          height[j] - (total_document_height - window_height) * height[j] / total_document_height * scroll_background_relative_velocity;
    }

    background[j].height = height[j].toInt();

    double zoom_factor = background_width[j] / background_real_width[j];
    double translate_factor = 0.0;
    double scaled_height = background_real_height[j] * zoom_factor;
    if (scaled_height < height[j]) {
      zoom_factor = height[j] / background_real_height[j];
      translate_factor = (background_real_width[j] * zoom_factor - background_width[j]) * 0.5;
    }

    background[j].context2D.resetTransform();
    background[j].context2D.translate(-translate_factor, 0);
    background[j].context2D.scale(zoom_factor, zoom_factor);
    background[j].context2D.drawImage(background_images[j], 0, 0);

    background_height[j] = height[j];

    scroll_y_position = window.scrollY.toDouble();

    double top = scroll_y_position * scroll_background_relative_velocity;
    for (int i = 0; i < j; i++) {
      top = top + height[i];
    }
    background[j].style.top = top.toString() + "px";
  }
}

void scrollBackground(double pixels) {
  int n = background.length;
  for (int i = 0; i < n; i++) {
    double top = double.parse(background[i].style.top.replaceAll("px", ""));
    background[i].style.top = (top + pixels).toString() + "px";
  }
}

void buildPage() {
/* HEADER */

  double header_width = window_width.toDouble();
  double header_height = header_width * 0.07;
  double google_play_height = header_height;
  double logo_height = header_height * 0.9;
  double logo_width = logo_height;
  double app_name_height = header_height * 0.7;
  double margin = header_height * 0.45;
  double google_play_font_size = header_height * 0.45;

  DivElement header = querySelector("#header");
  header.style.position = "fixed";
  header.style.backgroundColor = "rgba(200, 200, 200, 0.97)";
  header.style.width = header_width.toString() + "px";
  header.style.height = header_height.toString() + "px";

  DivElement google_play_text = querySelector("#get_trial");
  google_play_text.style.height = google_play_height.toString() + "px";
  google_play_text.style.fontSize = (google_play_font_size*0.8).toString() + "px";
  google_play_text.style.top = ((header_height - google_play_font_size) * 0.5).toString() + "px";
  google_play_text.style.right = (3 * margin + 3 * google_play_height).toString() + "px";

  ImageElement logo = querySelector("#logo");
  logo.style.height = logo_height.toString() + "px";
  logo.style.top = ((header_height - logo_height) * 0.5).toString() + "px";
  logo.style.left = (window_width*0.01).toString()+"px";

  DivElement app_name = querySelector("#inkandpaper");
  app_name.style.height = app_name_height.toString() + "px";
  app_name.style.fontSize = app_name_height.toString() + "px";
  app_name.style.left = (logo_width * 1.5).toString() + "px";
  app_name.style.top = ((logo_height - app_name_height) * 0.5).toString() + "px";

  ImageElement google_play_logo = querySelector("#google_play");
  google_play_logo.src = "./images/google_play_logo_white.png";
  google_play_logo.style.height = google_play_height.toString() + "px";
  google_play_logo.onMouseEnter.listen((e) {
    google_play_logo.src = "./images/google_play_logo_color.png";
  });
  google_play_logo.onMouseLeave.listen((e) {
    google_play_logo.src = "./images/google_play_logo_white.png";
  });
  google_play_logo.style.top = ((header_height - google_play_height) * 0.5).toString() + "px";
  google_play_logo.style.right = (2 * margin + 2 * google_play_height).toString() + "px";

  ImageElement amazon_logo = querySelector("#amazon");
  amazon_logo.src = "./images/amazon_logo_white.png";
  amazon_logo.style.height = google_play_height.toString() + "px";
  amazon_logo.onMouseEnter.listen((e) {
    amazon_logo.src = "./images/amazon_logo_color.png";
  });
  amazon_logo.onMouseLeave.listen((e) {
    amazon_logo.src = "./images/amazon_logo_white.png";
  });
  amazon_logo.style.top = ((header_height - google_play_height) * 0.5).toString() + "px";
  amazon_logo.style.right = (margin + google_play_height).toString() + "px";

  ImageElement samsung_logo = querySelector("#samsung");
  samsung_logo.src = "./images/samsung_logo_white.png";
  samsung_logo.style.height = google_play_height.toString() + "px";
  samsung_logo.onMouseEnter.listen((e) {
    samsung_logo.src = "./images/samsung_logo_color.png";
  });
  samsung_logo.onMouseLeave.listen((e) {
    samsung_logo.src = "./images/samsung_logo_white.png";
  });
  samsung_logo.style.top = ((header_height - google_play_height) * 0.5).toString() + "px";
  samsung_logo.style.right = "0px";

/* */

/* TITLE */
  double banner_real_width = 1280.0;
  double banner_real_height = 243.0;
  double banner_width = window_width.toDouble();
  double banner_height = banner_width / banner_real_width * banner_real_height;
  double subtitle_real_width = 1280.0;
  double subtitle_real_height = 125.0;
  double subtitle_width = window_width.toDouble() * 0.8;
  double subtitle_height = subtitle_width / subtitle_real_width * subtitle_real_height;
  double title_width = window_width.toDouble();
  double title_height = banner_height + subtitle_height;
  double title_top = header_height * 1.5;

  DivElement title = querySelector("#title");
  title.style.width = title_width.toString() + "px";
  title.style.height = title_height.toString() + "px";
  title.style.top = title_top.toString() + "px";

  ImageElement banner = querySelector("#banner");
  banner.style.width = (banner_width).toString() + "px";

  ImageElement subtitle = querySelector("#subtitle");
  subtitle.style.width = (subtitle_width).toString() + "px";
  subtitle.style.left = ((window_width - subtitle_width) * 0.5).toString() + "px";
  subtitle.style.top = (banner_height).toString() + "px";

/* */

  double font_size = window_width * 0.023;
  double line_height = window_width * 0.04;

/* DIVIDER 1 */
  double divider1_height = window_width.toDouble() * 0.5;
  double divider1_width = window_width.toDouble();
  double divider1_margin_top = window_width.toDouble() * 0.1;
  double text1_width = (window_width * 0.5).toDouble();
  double text1_margin = (window_width * 0.1).toDouble();
  /*double image1_real_width = 1280.0;
  double image1_real_height = 536.0;*/
  double image1_width = (window_width * 0.5).toDouble();
  double image1_margin = image1_width * 0.65;
  /*double image1_height = (image1_width - image1_margin) / image1_real_width * image1_real_height;*/

  DivElement divider1 = querySelector("#div1");
  divider1.style.top = title_top.toString() + "px";
  divider1.style.marginTop = divider1_margin_top.toString() + "px";
  divider1.style.width = divider1_width.toString() + "px";
  divider1.style.height = divider1_height.toString() + "px";

  DivElement text1 = querySelector("#text1");
  text1.style.top = (window_width*0.07).toString() + "px";
  text1.style.left = (text1_margin * 0.5).toString() + "px";
  text1.style.maxWidth = (text1_width - text1_margin).toString() + "px";
  text1.style.fontSize = font_size.toString() + "px";
  text1.style.lineHeight = line_height.toString() + "px";

  ImageElement image1 = querySelector("#image1");
  image1.style.width = (image1_width - image1_margin).toString() + "px";
  image1.style.left = ((image1_margin) * 0.5).toString() + "px";
  image1.style.top = (-window_width*0.01).toString() + "px";

/* DIVIDER 2 */
  double divider2_height = window_width.toDouble() * 0.53;
  double divider2_width = window_width.toDouble();
  double divider2_margin_top = 0.0;
  double text2_width = (window_width * 0.6).toDouble();
  double text2_margin = (window_width * 0.1).toDouble();
  double tablet_image_real_width = 1251.0;
  double tablet_image_real_height = 860.0;
  double image2_width = divider2_width * 0.5;
  double image2_margin = image2_width * 0.1;
  double image2_height = (image2_width - image2_margin) / tablet_image_real_width * tablet_image_real_height;

  DivElement divider2 = querySelector("#div2");
  divider2.style.width = divider2_width.toString() + "px";
  divider2.style.height = divider2_height.toString() + "px";
  divider2.style.marginTop = divider2_margin_top.toString() + "px";

  ImageElement image2 = querySelector("#image2");
  image2.style.width = (image2_width - image2_margin).toString() + "px";
  image2.style.height = image2_height.toString() + "px";
  image2.style.top = ((divider2_height - image2_height) * 0.5).toString() + "px";
  image2.style.left = (image2_margin * 0.5).toString() + "px";

  DivElement text2 = querySelector("#text2");
  text2.style.top = (window_width*0.055).toString() + "px";
  text2.style.left = (image2_width + text2_margin * 0.5).toString() + "px";
  text2.style.maxWidth = (text2_width - text2_margin).toString() + "px";
  text2.style.fontSize = font_size.toString() + "px";
  text2.style.lineHeight = line_height.toString() + "px";


/* DIVIDER 3 */
  double divider3_height = window_width.toDouble() * 0.37;
  double divider3_width = window_width.toDouble();
  double divider3_margin_top = window_width.toDouble() * 0.1;
  double text3_width = (window_width * 0.5).toDouble();
  double text3_margin = (window_width * 0.1).toDouble();
  /*double image3_real_width = 1280.0;
  double image3_real_height = 536.0;*/
  double image3_width = (window_width * 0.5).toDouble();
  double image3_margin = image3_width * 0.65;
  /* double image3_height = (image3_width - image3_margin) / image3_real_width * image3_real_height; */

  DivElement divider3 = querySelector("#div3");
  divider3.style.marginTop = divider3_margin_top.toString() + "px";
  divider3.style.width = divider3_width.toString() + "px";
  divider3.style.height = divider3_height.toString() + "px";

  DivElement text3 = querySelector("#text3");
  text3.style.top = (window_width*0.04).toString()+"px";
  text3.style.left = (text3_margin * 0.5).toString() + "px";
  text3.style.maxWidth = (text3_width - text3_margin).toString() + "px";
  text3.style.fontSize = font_size.toString() + "px";
  text3.style.lineHeight = line_height.toString() + "px";

  ImageElement image3 = querySelector("#image3");
  image3.style.width = (image3_width - image3_margin).toString() + "px";
  image3.style.left = (image3_margin * 0.5).toString() + "px";
  image3.style.top = (-window_width*0.04).toString()+"px";

  divider3.children.add(text3);
  divider3.children.add(image3);

/* DIVIDER 4 */
  double divider4_height = window_width.toDouble() * 0.4;
  double divider4_width = window_width.toDouble();
  double divider4_margin_top = 0.0;
  double text4_width = (window_width * 0.5).toDouble();
  double text4_margin = (window_width * 0.1).toDouble();
  double image4_width = divider4_width * 0.5;
  double image4_margin = image4_width * 0.1;
  double image4_height = (image4_width - image4_margin) / tablet_image_real_width * tablet_image_real_height;

  DivElement divider4 = querySelector("#div4");
  divider4.style.width = divider4_width.toString() + "px";
  divider4.style.height = divider4_height.toString() + "px";
  divider4.style.marginTop = divider4_margin_top.toString() + "px";

  ImageElement image4 = querySelector("#image4");
  image4.style.width = (image4_width - image4_margin).toString() + "px";
  image4.style.top = ((divider4_height - image4_height) * 0.5).toString() + "px";
  image4.style.left = (image4_margin * 0.5).toString() + "px";
  image4.style.height = (image4_height).toString() + "px";

  DivElement text4 = querySelector("#text4");
  text4.style.top = (window_width*0.08).toString() + "px";
  text4.style.left = (image4_width + text4_margin * 0.5).toString() + "px";
  text4.style.maxWidth = (text4_width - text4_margin).toString() + "px";
  text4.style.fontSize = font_size.toString() + "px";
  text4.style.lineHeight = line_height.toString() + "px";

/* DIVIDER 5 */
  double divider5_height = window_width.toDouble() * 0.3;
  double divider5_width = window_width.toDouble();
  double divider5_margin_top = window_width.toDouble() * 0.1;
  double text5_width = (window_width * 0.5).toDouble();
  double text5_margin = (window_width * 0.1).toDouble();
  /*double image5_real_width = 1280.0;
  double image5_real_height = 536.0;*/
  double image5_width = (window_width * 0.5).toDouble();
  double image5_margin = image5_width * 0.6;
  /*double image5_height = (image5_width - image5_margin) / image5_real_width * image5_real_height;*/

  DivElement divider5 = querySelector("#div5");
  divider5.style.marginTop = divider5_margin_top.toString() + "px";
  divider5.style.width = divider5_width.toString() + "px";
  divider5.style.height = divider5_height.toString() + "px";

  DivElement text5 = querySelector("#text5");
  text5.style.top = (window_width*0.03).toString() + "px";
  text5.style.left = (text5_margin * 0.5).toString() + "px";
  text5.style.maxWidth = (text5_width - text5_margin).toString() + "px";
  text5.style.fontSize = font_size.toString() + "px";
  text5.style.lineHeight = line_height.toString() + "px";

  ImageElement image5 = querySelector("#image5");
  image5.style.width = (image5_width - image5_margin).toString() + "px";
  image5.style.left = ((image5_margin) * 0.5).toString() + "px";
  image5.style.top = (-window_width*0.06).toString() + "px";

/* DIVIDER 6 */
  double divider6_height = window_width.toDouble() * 0.1;
  double divider6_width = window_width.toDouble();
  double divider6_margin_top = window_width.toDouble() * 0.1;
  double text6_width = (window_width).toDouble();
  double text6_margin = (window_width * 0.1).toDouble();
  double link_padding = window_width.toDouble() * 0.01;
  double link_top = window_width.toDouble() * 0.04;

  DivElement divider6 = querySelector("#div6");
  divider6.style.width = divider6_width.toString() + "px";
  divider6.style.height = divider6_height.toString() + "px";
  divider6.style.marginTop = divider6_margin_top.toString() + "px";

  DivElement text6 = querySelector("#text6");
  text6.style.left = (text6_margin * 0.5).toString() + "px";
  text6.style.maxWidth = (text6_width - text6_margin).toString() + "px";
  text6.style.fontSize = font_size.toString() + "px";
  text6.style.lineHeight = line_height.toString() + "px";

  AnchorElement link1 = querySelector("#youtube_link_1");
  link1.style.fontSize = font_size.toString() + "px";
  link1.style.padding = link_padding.toString() + "px";
  link1.style.borderRadius = link_padding.toString() + "px";
  link1.style.top = link_top.toString() + "px";
  link1.style.left = (window_width * 0.37).toString() + "px";
  AnchorElement link2 = querySelector("#youtube_link_2");
  link2.style.fontSize = font_size.toString() + "px";
  link2.style.padding = link_padding.toString() + "px";
  link2.style.borderRadius = link_padding.toString() + "px";
  link2.style.top = link_top.toString() + "px";
  link2.style.left = (window_width * 0.53).toString() + "px";


  /* DIVIDER 7 */
  double divider7_height = window_width.toDouble() * 0.1;
  double divider7_width = window_width.toDouble();
  double text7_width = (window_width).toDouble();
  double text7_margin = (window_width * 0.1).toDouble();

  DivElement divider7 = querySelector("#div7");
  divider7.style.width = divider7_width.toString() + "px";
  divider7.style.height = divider7_height.toString() + "px";

  DivElement text7 = querySelector("#text7");
  text7.style.left = (text7_margin * 0.5).toString() + "px";
  text7.style.maxWidth = (text7_width - text7_margin).toString() + "px";
  text7.style.fontSize = font_size.toString() + "px";
  text7.style.lineHeight = line_height.toString() + "px";

  AnchorElement link3 = querySelector("#manual_link");
  link3.style.color = "white";
  link3.style.fontSize = (font_size*0.77).toString() + "px";
  link3.style.padding = link_padding.toString() + "px";
  link3.style.borderRadius = link_padding.toString() + "px";
  link3.style.top = link_top.toString() + "px";
  link3.style.left = (window_width * 0.37).toString() + "px";


/* FOOTER */

  double footer_height = window_width*0.08;
  double mail_height = header_height * 0.9;
  double facebook_height = mail_height;

  Element footer = querySelector("#footer");
  footer.style.width = header_width.toString() + "px";
  footer.style.height = footer_height.toString() + "px";
  footer.style.top = (header_height).toString() + "px";

  ImageElement mail = querySelector("#mail");
  mail.onMouseEnter.listen((e) {
    mail.src = "./images/mail_color.png";
  });
  mail.onMouseLeave.listen((e) {
    mail.src = "./images/mail_white.png";
  });
  mail.style.height = (mail_height).toString() + "px";
  mail.style.right = margin.toString() + "px";
  mail.style.top = ((footer_height - mail_height) * 0.5).toString() + "px";

  ImageElement facebook = querySelector("#facebook");
  facebook.src = "./images/facebook_white.png";
  facebook.onMouseEnter.listen((e) {
    facebook.src = "./images/facebook_color.png";
  });
  facebook.onMouseLeave.listen((e) {
    facebook.src = "./images/facebook_white.png";
  });
  facebook.style.height = (facebook_height).toString() + "px";
  facebook.style.right = (3 * margin + mail_height).toString() + "px";
  facebook.style.top = ((footer_height - facebook_height) * 0.5).toString() + "px";

/* */

  total_document_height = title_top +
      title_height +
      divider1_margin_top +
      divider1_height +
      divider2_margin_top +
      divider2_height +
      divider3_margin_top +
      divider3_height +
      divider4_margin_top +
      divider4_height +
      divider5_margin_top +
      divider5_height +
      divider6_margin_top +
      divider6_height +
      divider7_height +
      footer_height * 0.1;

  querySelector("#background1").remove();
  querySelector("#background2").remove();
  querySelector("#background3").remove();

  addBackgrounds();
}
